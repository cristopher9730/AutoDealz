import {
    Grid, 
    Card, 
    CardMedia, 
    CardContent, 
    CardActions, 
    Typography, 
    Button, 
    CircularProgress,
    Box
} from "@mui/material";
import { useEffect, useState } from "react";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EditIcon from '@mui/icons-material/Edit';

export const Dashboard = () =>{

    const dashBoard = {
        display:'flex',
        flexWrap:'wrap',
        marginTop: '10%'
    }
    
    const [carArray, setCarArray] = useState([]); 
    const [isLoading, setIsLoading] = useState(false);

    const numberWithCommas = (number) =>{
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    useEffect(()=>{
        setIsLoading(true);
        fetch('https://componentes-spring.azurewebsites.net/api/cars/getCars')
        .then(response => response.json())
        .then(data => {
            setCarArray(data);
            setIsLoading(false);
        });
    },[]);

    return (
        <>
        {!isLoading ? <Grid sx={dashBoard}>
            {carArray.map(car =>{
                let color = 'rgba(62, 214, 17, 1)';
                let lightColor = 'rgba(62, 214, 17, 0.3)';
                let soldLabel = 'For Sale';
                if(car.sold){
                    color = 'rgba(221, 51, 10, 1)';
                    lightColor = 'rgba(221, 51, 10, 0.3)';
                    soldLabel = 'Sold';
                }
                return (
                    <Card sx={{ width: '20%', margin: '10px 30px' }}>
                        <CardMedia
                            sx={{ height: 140 }}
                            image={car.picture}
                        />
                        <CardContent>
                            <Box display={'flex'} width={'95%'} justifyContent={'space-between'} alignItems={'center'}>
                                <Typography sx={{fontSize:'20px'}}>
                                    {`${car.brand} ${car.model}`}
                                </Typography>
                                <Typography variant="body2" sx={{backgroundColor: lightColor,
                                color:color, padding:'0 5px'}}>{soldLabel}</Typography>
                            </Box>
                            <Box width={'95%'}>
                                <Typography sx={{fontSize:'17px'}}>
                                    {`$${numberWithCommas(car.price)}`}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">{`Year: ${car.year} - Color: ${car.color}`}</Typography>
                                <Typography variant="body2" color="text.secondary">{`Fuel: ${car.fuel}`}</Typography>
                            </Box>
                        </CardContent>
                            <CardActions sx={{justifyContent:'center'}}>
                                    <Button size='small' variant='contained'
                                    disabled={car.sold} color='primary'><EditIcon/></Button>
                                    <Button size='small' variant='contained' 
                                    disabled={car.sold}
                                    color='primary'><AttachMoneyIcon/></Button>
                            </CardActions>
                        </Card>
                )
            })}
        </Grid> : 
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100vh'}>
                <CircularProgress color='primary'/>
            </Box>
        }
        </>
    )
}
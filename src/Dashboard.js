import {Grid, Card, CardMedia, CardContent, CardActions, Typography, Button} from "@mui/material";
import { useEffect, useState } from "react";

export const Dashboard = () =>{

    const dashBoard = {
        display:'flex',
        flexWrap:'wrap',
        marginTop: '10%'
    }
    
    const [carArray, setCarArray] = useState([]); 

    useEffect(()=>{
        fetch('https://componentes-spring.azurewebsites.net/api/cars/getCars')
        .then(response => response.json())
        .then(data => setCarArray(data));
    },[]);

    return (
        <Grid sx={dashBoard}>
            {carArray.map(car =>{
                return (
                    <Card sx={{ width: '20%', margin: '10px 30px' }}>
                        <CardMedia
                            sx={{ height: 140 }}
                            image={car.picture}
                        />
                        <CardContent>
                            <Typography gutterBottom sx={{fontSize:'15px'}} component="div">
                                {`${car.brand} ${car.model} - $${car.price}`}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {`${car.plateNumber} - ${car.color} - ${car.year} - ${car.fuel}`}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size='small' variant='contained' color='primary'>Edit</Button>
                            <Button size='small' variant='contained' color='primary'>Mark as Sold</Button>
                        </CardActions>
                        </Card>
                )
            })}
        </Grid>
    )
}
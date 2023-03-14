import {
    Grid, 
    Card, 
    CardMedia, 
    CardContent, 
    CardActions, 
    Typography, 
    Button, 
    CircularProgress,
    Box,
    TextField,
    Link,
    InputAdornment,
    Select,
    FormControl,
    MenuItem,
    InputLabel,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle     
} from "@mui/material";
import { useEffect, useState } from "react";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InfoIcon from '@mui/icons-material/Info';

const flex = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}

const API_BASE_URL = 'https://componentes-spring.azurewebsites.net';

export const Dashboard = (props) =>{

    const dashBoard = {
        display:'flex',
        flexWrap:'wrap',
        marginTop: '9%',
        '@media screen and (max-width:900px)':{
            marginTop:'13%'
        },
        '@media screen and (max-width:700px)':{
            marginTop:'20%'
        }
    }
    
    const [carArray, setCarArray] = useState([]); 
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCar, setSelectedCar] = useState({});
    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState();

    const numberWithCommas = (number) =>{
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    useEffect(()=>{
        if(!props.info){
            restartCar();
        }      
        loadPage();
    },[]);

    const restartCar = () => {
        setSelectedCar({
            brand: '',
            color: '',
            cylinders: '',
            fuel:'',
            model:'',
            odometer:'',
            picture: '',
            price: '',
            sold: false,
            transmission:'',
            type: '',
            year: ''
        })
        setPreviewUrl(null)
    }

    useEffect(() => {
        if (!file) {
          return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
          setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(file);
      }, [file]);

    
      const fileUpload = event => {
        let pickedFile;
        if (event.target.files && event.target.files.length === 1) {
          pickedFile = event.target.files[0];
          setFile(pickedFile);
        }
      };

    const loadPage = () => {
        setIsLoading(true);
        fetch(`${API_BASE_URL}/api/cars/getCars`)
        .then(response => response.json())
        .then(data => {
            setCarArray(data);
            setIsLoading(false);
        });
    } 

      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSelectedCar((prevState) => ({
          ...prevState,
          [name]: value
        }));
      };

      const markAsSold = (car) =>{
        car.sold = true;
        submit(car);
      }

      const deleteCar = (carId) => {
        fetch(`${API_BASE_URL}/api/cars/deleteCar?carId=${carId}`)
        .then(() => {
            loadPage();
            props.handleModal(false);
        }); 
      }

      const submit = (car) =>{
        let api = '/api/cars/updateCar';
        const formData = new FormData();
        if(file){
            formData.append('file', file);
            api = '/api/cars/updateCarMultipart';
        }              
        formData.append('car', JSON.stringify(car));
        fetch(`${API_BASE_URL}${api}`,
            {
                method: 'POST',
                headers: {},
                body: formData
            }).then(() => {
                loadPage();
                props.handleModal(false);
            });
      }

      const modalAction = () => {
        if(!props.info){
            submit(selectedCar);
        }
        else{
            props.handleInfo(false);
        }
    }

      const generateYearOptions = () => {
        const currentYear = new Date().getFullYear();
        const years = [];
    
        for (let year = currentYear; year >= currentYear - 60; year--) {
          years.push(year);
        }
    
        return years;
      };

    return (
        <>
        {!isLoading ? <Grid sx={dashBoard} container>
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
                    <Grid item lg={3} md={6} sm={6} xs={12}>
                        <Card sx={{minWidth:'275px', margin:'10px 20px'}}>
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
                                <Box display={'flex'} width={'55%'} justifyContent={'space-evenly'}>
                                    <Button size='small' variant='contained'
                                    onClick={() => {
                                        setSelectedCar(car);
                                        props.handleInfo(true);
                                        props.handleModal(true);
                                    }}
                                    color='primary'><InfoIcon/></Button>
                                    {!car.sold && <Button size='small' variant='contained' 
                                    onClick={() => {
                                        markAsSold(car);
                                    }}
                                    color='primary'><AttachMoneyIcon/></Button>}
                                </Box>
                            </CardActions>
                        </Card>
                    </Grid>
                )
            })}
        </Grid> : 
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100vh'}>
                <CircularProgress color='primary'/>
            </Box>
        }


        <Dialog
            open={props.openModal}
            scroll={'paper'}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            sx={{
                '& .css-1t1j96h-MuiPaper-root-MuiDialog-paper':{
                maxWidth:'70%'
            }}}
        >
            <DialogTitle id="scroll-dialog-title">
                <Box >
                        <Typography id="modal-modal-title" variant="h5" textAlign={'center'}>
                            {props.info ? "Information": "Submit Car"}
                        </Typography>
                </Box>
            </DialogTitle>
            <DialogContent dividers>
            <DialogContentText
                id="scroll-dialog-description"
            >
                <Box>
                <Box sx={{m:3}}>
                    
                    <Grid 
                    container spacing={2} 
                    direction="row"
                    justifyContent="space-evenly"
                    sx={{width:'100%', m:0}}
                    >
                        <Grid item lg={3} md={6} sm={10} xs={12}>
                            <Box sx={{mb:2}}>
                                <TextField 
                                    label="Brand" 
                                    variant="outlined" 
                                    fullWidth 
                                    defaultValue={props.info? selectedCar.brand:''} 
                                    disabled={props.info}
                                    name='brand'
                                    onChange={handleInputChange}
                                />
                            </Box>
                            <Box sx={{mb:2}}>
                                <TextField 
                                    label="Color" 
                                    variant="outlined" 
                                    fullWidth 
                                    defaultValue={props.info? selectedCar.color:''} 
                                    disabled={props.info}
                                    name='color'
                                    onChange={handleInputChange}
                                />
                            </Box>
                            <Box sx={{mb:2}}>

                                <FormControl sx={{ m: 0, width:'100%' }}>
                                    <InputLabel id="selectType">Type</InputLabel>
                                    <Select
                                        labelId="selectType"
                                        value={selectedCar.type}
                                        onChange={handleInputChange}
                                        label="Type"
                                        name='type'
                                        disabled={props.info} 
                                        >
                                        <MenuItem value='Sedan'>
                                            <em>Sedan</em>
                                        </MenuItem>
                                        <MenuItem value='Hatchback'>
                                            <em>Hatchback</em>
                                        </MenuItem>  
                                        <MenuItem value='SUV'>
                                            <em>SUV</em>
                                        </MenuItem> 
                                        <MenuItem value='Coupe'>
                                            <em>Coupe</em>
                                        </MenuItem>
                                        <MenuItem value='Pickup'>
                                            <em>Pickup</em>
                                        </MenuItem>  
                                        
                                    </Select>
                                </FormControl>

                            </Box>
                            <Box sx={{mb:2}}>
                                <TextField 
                                    label="Price" 
                                    variant="outlined" 
                                    fullWidth 
                                    defaultValue={props.info? selectedCar.price:''} 
                                    disabled={props.info} 
                                    name='price'
                                    onChange={handleInputChange}
                                    type='number' 
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                    }} 
                                />
                            </Box>
                        </Grid>
                        <Grid item lg={3} md={6} sm={10} xs={12}>
                            <Box sx={{mb:2}}>
                                <TextField 
                                    label="Model" 
                                    variant="outlined" 
                                    fullWidth 
                                    defaultValue={props.info? selectedCar.model:''} 
                                    disabled={props.info} 
                                    name='model'
                                    onChange={handleInputChange}    
                                />
                            </Box>
                            <Box sx={{mb:2}}>

                                <FormControl sx={{ m: 0, width:'100%' }}>
                                    <InputLabel id="selectFuel">Fuel</InputLabel>
                                    <Select
                                        labelId="selectFuel"
                                        value={selectedCar.fuel}
                                        onChange={handleInputChange}
                                        label="Fuel"
                                        name='fuel'
                                        disabled={props.info} 
                                        >                                      
                                        
                                        <MenuItem value='Gas'>
                                            <em>Gas</em>
                                        </MenuItem>
                                        <MenuItem value='Diesel'>
                                            <em>Diesel</em>
                                        </MenuItem>  
                                        
                                    </Select>
                                </FormControl>

                            </Box>
                            <Box sx={{mb:2}}>
                                <TextField 
                                    label="Odometer" 
                                    variant="outlined" 
                                    fullWidth 
                                    defaultValue={props.info? selectedCar.odometer:''} 
                                    disabled={props.info} 
                                    name='odometer'
                                    type='number'
                                    onChange={handleInputChange}    
                                />
                            </Box>
                            <Box sx={{mb:2}}>

                                <FormControl sx={{ m: 0, width:'100%' }}>
                                    <InputLabel id="selectTransmission">Transmission</InputLabel>
                                    <Select
                                        labelId="selectTransmission"
                                        value={selectedCar.transmission}
                                        onChange={handleInputChange}
                                        label="Transmission"
                                        name='transmission'
                                        disabled={props.info} 
                                        >                                      
                                        
                                        <MenuItem value='Manual'>
                                            <em>Manual</em>
                                        </MenuItem>
                                        <MenuItem value='Automatic'>
                                            <em>Automatic</em>
                                        </MenuItem>  
                                        
                                    </Select>
                                </FormControl>

                            </Box>
                        </Grid>
                        <Grid item lg={3} md={6} sm={10} xs={12}>
                        <Box sx={{mb:2}}>
                                
                                <FormControl sx={{ m: 0, width:'100%' }}>
                                    <InputLabel id="selectYear">Year</InputLabel>
                                    <Select
                                        labelId="selectYear"
                                        value={selectedCar.year}
                                        onChange={handleInputChange}
                                        label="Year"
                                        name='year'
                                        disabled={props.info} 
                                        >
                                        
                                        {generateYearOptions().map((year) => (
                                        <MenuItem value={year}>
                                            <em>{year}</em>
                                        </MenuItem> 
                                        ))}
                                        
                                    </Select>
                                </FormControl>
                            
                            </Box>
                            <Box sx={{mb:2}}>
                                <TextField 
                                    label="Cylinders" 
                                    variant="outlined" 
                                    fullWidth 
                                    defaultValue={props.info? selectedCar.cylinders:''} 
                                    disabled={props.info} 
                                    name='cylinders'
                                    type='number'
                                    onChange={handleInputChange}    
                                />
                            </Box>
                            <Box sx={{mb:2}}>

                                <FormControl sx={{ m: 0, width:'100%' }}>
                                    <InputLabel id="selectType">Type</InputLabel>
                                    <Select
                                        labelId="selectType"
                                        value={selectedCar.type}
                                        onChange={handleInputChange}
                                        label="Type"
                                        name='type'
                                        disabled={props.info} 
                                        >
                                        
                                        
                                        <MenuItem value='Sedan'>
                                            <em>Sedan</em>
                                        </MenuItem>
                                        <MenuItem value='Hatchback'>
                                            <em>Hatchback</em>
                                        </MenuItem>  
                                        <MenuItem value='SUV'>
                                            <em>SUV</em>
                                        </MenuItem> 
                                        <MenuItem value='Coupe'>
                                            <em>Coupe</em>
                                        </MenuItem>
                                        <MenuItem value='Pickup'>
                                            <em>Pickup</em>
                                        </MenuItem>  
                                        
                                    </Select>
                                </FormControl>

                            </Box>
                        </Grid>
                        <Grid item lg={3} md={6} sm={10} xs={12} sx={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                                        <Box width={'100%'} height={'70%'} sx={{mb:1}} >
                                            {<img 
                                            src={previewUrl ? previewUrl:selectedCar.picture !=''?selectedCar.picture:'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled.png'} 
                                            style={{
                                                objectFit:'cover',
                                                objectPosition:'center', 
                                                width:'100%',
                                                height:'100%'
                                            }}
                                            />}
                                        </Box> 
                                        <Box display={'flex'} justifyContent='center'>
                                            {!props.info? (<Button variant='contained' component='label' sx={{margin:'0 auto'}}>
                                                Upload Image
                                                <input 
                                                    type={'file'} 
                                                    hidden 
                                                    onChange={fileUpload}
                                                    accept='.jpg,.png,.jpeg,.webp'
                                                />
                                            </Button>):''}
                                        </Box>   
                        </Grid>
                    </Grid>
                </Box>
                </Box>
            </DialogContentText>
            </DialogContent>
            <DialogActions sx={{display:'block'}}>
                <Box sx={flex}>
                        <Box>
                            {!selectedCar.sold && <Button size='medium' variant='contained'
                            color='primary' sx={{m:'15px', width:'90px'}}
                            onClick={()=>{
                                modalAction();
                            }}
                            >
                                {props.info ? "Edit": "Save"}
                            </Button>}
                        </Box>
                        <Box>
                            <Button size='medium' variant='contained'
                            color='primary' sx={{m:'15px', width:'90px'}}
                            onClick = {()=> {
                                props.handleModal(false);
                                restartCar();
                            }}
                            >
                                Close
                            </Button>
                        </Box>
                </Box>
                <Box display={'flex'} justifyContent={'center'}>
                        {props.info && <Link sx={{cursor:'pointer'}} onClick={()=>{deleteCar(selectedCar.id)}} >Delete Car</Link>}
                </Box>
            </DialogActions>
        </Dialog>

        </>
    )
}
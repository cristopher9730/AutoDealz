import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { AppBar,createTheme,ThemeProvider, Typography, Box, Button, Modal} from "@mui/material";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { Dashboard } from "./Dashboard";
import { useState } from "react";

const icon = {
  margin: '15px',
  fontSize: '60px'
}
const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#0F0D0B',
      contrastText:'#C9611B'
    },
    secondary:{
      main: '#C9611B',
      contrastText:'#0F0D0B'
    }
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: 'h1',
        },
      },
    },
  },
});

const flex = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center'
}

const flexAppBar = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between'
}

const tittle = {
  fontSize: 25,
  fontFamily: 'Verdana'
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const App = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
    <ThemeProvider theme={darkTheme}>

    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5">
            Agregar Carro
          </Typography>
        </Box>
      </Modal>

      <AppBar color='primary' position='fixed' sx={flexAppBar}>
        <Box sx={flex}>
          <DirectionsCarIcon sx={icon}/>
          <Typography variant="h1" sx={tittle}>Cars</Typography>
        </Box>
        <Box>
        <Button onClick={handleOpen} size='medium' variant='contained'
         color='secondary' sx={{m:'15px'}}>Agregar Carro</Button>
        </Box>
      </AppBar>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Dashboard/>}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
    </>
  );
}

export default App;

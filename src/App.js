import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { AppBar,createTheme,ThemeProvider} from "@mui/material";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
const icon = {
  margin: '15px',
  fontSize: '60px'
}
const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      contrastText:'#ffcc00'
    },
    secondary:{
      main: '#1976d2',
      contrastText:'#ffcc00'
    }
  },
});

const App = () => {
  return (
    <>
    <ThemeProvider theme={darkTheme}>
      <AppBar color='primary' >
      <DirectionsCarIcon sx={icon}/>
      </AppBar>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<div>CARS</div>}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
    </>
  );
}

export default App;

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { AppBar } from "@mui/material";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

const icon = {
  margin: '15px',
  fontSize: '60px'
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

const App = () => {
  return (
    <>
    <AppBar color="#253237" >
    <DirectionsCarIcon sx={icon}/>
    </AppBar>
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<div>CARS</div>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;

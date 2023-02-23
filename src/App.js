import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { AppBar,createTheme,ThemeProvider} from "@mui/material";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { Dashboard } from "./Dashboard";

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
      main: '#FFFFFF',
      contrastText:'#000000'
    }
  },
});

const App = () => {
  return (
    <>
    <ThemeProvider theme={darkTheme}>
      <AppBar color='primary' position='fixed'>
        <DirectionsCarIcon sx={icon}/>
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

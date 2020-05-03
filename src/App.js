import React from 'react';
import './App.css';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import Register from './components/CommerceRegister/Register';


const theme = createMuiTheme({
  palette: {
    primary: red
  }
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Register />
    </ThemeProvider>
  )
}

export default App;

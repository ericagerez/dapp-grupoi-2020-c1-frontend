import React from 'react';
import './App.css';
import Login from './components/Login';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import { red } from '@material-ui/core/colors';


const theme = createMuiTheme({
  palette: {
    primary: red
  }
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Login />
    </ThemeProvider>
  )
}

export default App;

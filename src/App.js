import React from 'react';
import './App.css';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import Home from './components/Home';


const theme = createMuiTheme({
  palette: {
    primary: red
  }
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  )
}

export default App;

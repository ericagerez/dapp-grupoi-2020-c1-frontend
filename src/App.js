import React from 'react';
import './App.css';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { BrowserRouter, Route } from 'react-router-dom';
import CommerceRegister from './components/CommerceRegister/Register';
import Login from './components/Login';
import Home from './components/Home'
import SuccessPage from './components/SuccessPage';

const theme = createMuiTheme({
  palette: {
    primary: red
  }
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
          <Route path="/registration/commerce/success">
            <SuccessPage text="Se registró el comercio correctamente" />
          </Route>
          <Route path="/registration/commerce">
            <CommerceRegister />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Home />
          </Route>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App;

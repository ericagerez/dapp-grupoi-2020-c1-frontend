import React from 'react';
import { Container, Typography, Grid, Button, makeStyles, useMediaQuery, useTheme } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 0, 4),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
}));

export default function Welcome() {
  const classes = useStyles();
  const theme = useTheme()
  const sm = useMediaQuery(theme.breakpoints.up('sm'));

  return <div className={classes.heroContent}>
    <Container maxWidth="sm">
      <Typography component="h1" variant={sm ? "h2" : "h4"} align="center" color="textPrimary" gutterBottom>
        Bienvenidx!
    </Typography>
      <Typography variant={sm ? "h5" : 'h6'} align="center" color="textSecondary" paragraph>
        Donde comprar y vender casi todo
    </Typography>
      <div className={classes.heroButtons}>
        <Grid container spacing={2} justify="center">
          <Grid item>
            <Button variant="contained" color="primary">
              Iniciar sesión
          </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="primary">
              Crear una cuenta
          </Button>
          </Grid>
        </Grid>
      </div>
    </Container>
  </div>
}

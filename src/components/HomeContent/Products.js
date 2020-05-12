import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import productProvider from '../../api/product';
import { TextField, Select, MenuItem, InputLabel, FormControl , FormHelperText} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  textCenter: {
    textAlign: 'center'
  },
  formControl: {
    margin: theme.spacing(4),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Products() {
  
  const classes = useStyles();
  
  const [products, setProducts] = useState([])
  const [order, setOrder] = useState('');

  const sortProducts = type => {
    const sorted = products.sort((a, b) => type==='higher' ? b.price - a.price : a.price - b.price);
    setOrder(sorted);
  };

useEffect(()=>{
    productProvider.getAll().then(products=>setProducts(products))}, 
    [setProducts])
 
  return (
    <>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Container className={classes.cardGrid} maxWidth="md">
            <FormControl className={classes.formControl} maxWidth="md">
              <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                Ordenar
              </InputLabel>
              <Select
                labelId="demo-simple-select-placeholder-label-label"
                id="demo-simple-select-placeholder-label"
                value={order}
                onChange={(e) => sortProducts(e.target.value)}
                displayEmpty
                className={classes.selectEmpty}
              >
                <MenuItem value="">
                  <em>Ninguno</em>
                </MenuItem>
                <MenuItem value="lower">Menor Precio</MenuItem>
                <MenuItem value="higher">Mayor Precio</MenuItem>
              </Select>
            </FormControl>
          {/* End hero unit */}
          <Grid container spacing={4}>
            {products.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image= {card.image}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.name}
                    </Typography>
                    <Typography gutterBottom variant="h7" component="h7">
                      {card.trademark}
                    </Typography>
                    <Typography className={classes.textCenter}>
                      ${card.price}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      Comprar
                    </Button>
                    <Button size="small" color="primary">
                      AGregar al carrito
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </>
  );
}
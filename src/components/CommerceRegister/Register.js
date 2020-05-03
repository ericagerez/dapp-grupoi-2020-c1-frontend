import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import loginImage from '../../resources/img/logo.png'
import { registerCommerce } from '../../api/commerce';
import { CircularProgress } from '@material-ui/core';
import UserForm from './UserForm';
import CommerceForm from './CommerceForm';
import { useStepper } from './Stepper';
import commerceCategoryProvider from '../../api/commerce-category'
import paymentMethodProvider from '../../api/payment-method'
import CommerceDetailForm from './CommerceDetailForm';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${loginImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(2, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.common.white,
    width: "30%",
    height: "30%",
  },
  submit: {
    margin: theme.spacing(3, 2, 2),
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    margin: theme.spacing(2)
  },
  prevNextButton: {
    margin: theme.spacing(0, 2)
  },
  chip: {
    margin: theme.spacing(2, 4)
  },
  register: {
    margin: theme.spacing(0, 0, 2)
  }
}));

function validateUserForm(email, password, repeatPassword) {
  var re = /\S+@\S+\.\S+/;
  const errors = {
    email: [],
    password: [],
    repeatPassword: []
  }
  if (!re.test(email)) {
    errors.email = ['Email inválido']
  }

  if (password.length <= 7) {
    errors.password = [...errors.password, 'Contraseña demasiado corta']
  }

  if (password !== repeatPassword) {
    errors.password = [...errors.password, 'Las contraseñas no coinciden']
    errors.repeatPassword = [...errors.repeatPassword, 'Las contraseñas no coinciden']
  }

  return [!(Object.keys(errors).some(k => errors[k].length !== 0)), errors]
}

function validateCommerceForm(name, address, distance) {
  const errors = {
    name: [],
    address: [],
    distance: []
  }
  if (name.length <= 2) {
    errors.name = [...errors.name, 'Nombre demasiado corto']
  }

  if (address.length <= 3) {
    errors.address = [...errors.address, 'Dirección no válida']
  }

  if (distance <= 0) {
    errors.distance = [...errors.distance, 'Distancia no válida']
  }

  return [!(Object.keys(errors).some(k => errors[k].length !== 0)), errors]
}

function validateCommerceDetailForm(category, selectedPaymentMethods) {
  const errors = {
    category: [],
    payment: [],
  }
  if (category===0) {
    errors.category = ['Seleccione una categoría']
  }

  if (selectedPaymentMethods.length === 0) {
    errors.payment = ['Seleccione algún método de pago']
  }
  return [!(Object.keys(errors).some(k => errors[k].length !== 0)), errors]
}

export default function CommerceRegister() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const [userErrors, setUserErrors] = useState({})
  const [commerceName, setCommerceName] = useState("")
  const [commerceAddress, setCommerceAddress] = useState("")
  const [commerceMaxDistance, setCommerceMaxDistance] = useState(0)
  const [commerceErrors, setCommerceErrors] = useState({})
  const [commerceCategories, setCommerceCategories] = useState([])
  const [paymentMethods, setPaymentMethods] = useState([])
  const [selectedCategory, setSelectedCategory] =  useState(0)
  const [selectedPaymentMethods, setSelectedPaymentMethods] =  useState([])
  const [commerceDetialErrors, setCommerceDetialErrors] = useState({})

  useEffect(()=>{
    commerceCategoryProvider.getAll().then(categories=>setCommerceCategories(categories))
    paymentMethodProvider.getAll().then(methods=>setPaymentMethods(methods))
  }, [setCommerceCategories, setPaymentMethods])
  
  const childs = [
    {
      Form: UserForm,
      props: {
        email,
        setEmail,
        password,
        setPassword,
        repeatPassword,
        setRepeatPassword,
        errors: userErrors
      },
      validate: () => validateUserForm(email, password, repeatPassword),
      setErrors: setUserErrors,
      label: "Datos de usuario"
    }, {
      Form: CommerceForm,
      props: {
        commerceName,
        setCommerceName,
        commerceAddress,
        setCommerceAddress,
        commerceMaxDistance,
        setCommerceMaxDistance,
        errors: commerceErrors
      },
      validate: () => validateCommerceForm(commerceName, commerceAddress, commerceMaxDistance),
      setErrors: setCommerceErrors,
      label: "Datos del comercio"
    },
    {
      Form: CommerceDetailForm,
      props: {
        commerceCategories,
        paymentMethods,
        selectedCategory,
        setSelectedCategory,
        selectedPaymentMethods,
        setSelectedPaymentMethods,
        errors: commerceDetialErrors
      },
      validate: () => validateCommerceDetailForm(selectedCategory, selectedPaymentMethods),
      setErrors: setCommerceDetialErrors,
      label: "Detalles del comercio"
    },
  ]
  const [Stepper, handleNext, handleBack, activeStep] = useStepper(childs.map(c => c.label))
  function handleLogin() {
    setLoading(true)
    registerCommerce(email, password, commerceName, commerceAddress, commerceMaxDistance, selectedCategory, selectedPaymentMethods)
      .finally(() => {
        setLoading(false)
      })
  }

  const CurrentChild = childs[activeStep].Form
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Registrar Comercio
          </Typography>
          <Stepper />
          <CurrentChild {...childs[activeStep].props} />
          <div className={classes.buttons}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.prevNextButton}
            >
              Anterior
            </Button>
            <Button 
              disabled={activeStep === childs.length - 1} 
              variant="contained" 
              color="primary" 
              className={classes.prevNextButton}
              onClick={() => {
                const validation = childs[activeStep].validate()
                childs[activeStep].setErrors(validation[1])
                if (validation[0])
                  handleNext()
            }}>
              Siguiente
            </Button>

          </div>
          {activeStep === childs.length - 1 && 
            <Button 
              fullWidth 
              variant="contained" 
              color="primary" 
              className={classes.register}
              onClick={() => {
                const validation = childs[activeStep].validate()
                childs[activeStep].setErrors(validation[1])
                if (validation[0])
                  handleLogin()
              }}>
              Registrarse
            </Button>}
          {loading && <CircularProgress />}
        </div>
      </Grid>
    </Grid>
  );
}
import React from 'react'
import { Select, MenuItem, FormControl, InputLabel, FormHelperText, makeStyles, Checkbox, FormControlLabel } from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2, 0, 0),
    minWidth: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function CommerceDetailForm({
  commerceCategories,
  paymentMethods,
  selectedCategory,
  setSelectedCategory,
  selectedPaymentMethods,
  setSelectedPaymentMethods,
  errors
}) {
  const classes = useStyles()
  return (
    <>
      <FormControl className={classes.formControl} error={errors.category && errors.category.length > 0}>
        <InputLabel shrink id="category-label">
          Categoria del comercio
        </InputLabel>
        <Select
          labelId="category-label"
          id="category"
          value={selectedCategory || 0}
          fullWidth
          onChange={e => setSelectedCategory(e.target.value)}
        >
          <MenuItem value={0} disabled>
            Seleccione una
          </MenuItem>
          {commerceCategories.map(cc => {
            return <MenuItem value={cc.id}>{cc.name}</MenuItem>
          })}
        </Select>
        <FormHelperText>{errors.category && errors.category.join(". ")}</FormHelperText>
      </FormControl>
      <FormControl className={classes.formControl} error={errors.payment && errors.payment.length > 0}>
        <InputLabel shrink id="payment-label">
          Métodos de pago
        </InputLabel>
          {paymentMethods.map(cc => {
            return <FormControlLabel 
              control={<Checkbox
                labelId="payment-label"
                id="payment"
                color="primary"
                checked={selectedPaymentMethods.some(pm => pm === cc.id)}
                fullWidth
                style={{margin:'10px'}}
                onChange={e => setSelectedPaymentMethods([...selectedPaymentMethods, cc.id])}
              />}
              label={cc.name}
            />
          })}
        <FormHelperText>{errors.payment && errors.payment.join(". ")}</FormHelperText>
      </FormControl>

    </>
  )
}
import React from 'react'
import { TextField } from '@material-ui/core'

export default function CommerceForm({
  commerceName,
  setCommerceName,
  commerceAddress,
  setCommerceAddress,
  commerceMaxDistance,
  setCommerceMaxDistance,
  errors
}) {
  return (
    <>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="name"
        label="Nombre del comercio"
        name="name"
        value={commerceName}
        onChange={e=>setCommerceName(e.target.value)}
        error={errors.name && errors.name.length>0}
        helperText={errors.name && errors.name.join(". ")}
        autoFocus
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="address"
        label="Domicilio"
        name="address"
        value={commerceAddress}
        onChange={e=>setCommerceAddress(e.target.value)}        
        error={errors.address && errors.address.length>0}
        helperText={errors.address && errors.address.join(". ")}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="distance"
        label="Radio de entrega (km)"
        name="distance"
        value={commerceMaxDistance}
        onChange={e=>setCommerceMaxDistance(e.target.value)}
        error={errors.distance && errors.distance.length>0}
        helperText={errors.distance && errors.distance.join(". ")}
      />
    </>
  )
}
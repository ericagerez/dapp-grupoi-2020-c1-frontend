import React from 'react'
import { TextField } from '@material-ui/core'


export default function UserForm({ email, setEmail, password, setPassword, repeatPassword, setRepeatPassword, errors}) {
  
  return (
    <>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        key="email"
        label="Correo Electrónico"
        name="email"
        autoComplete="email"
        error={errors.email && errors.email.length>0}
        helperText={errors.email && errors.email.join(". ")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        error={errors.password && errors.password.length>0}
        helperText={errors.password && errors.password.join(". ")}
        label="Contraseña"
        type="password"
        key="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="repeat-password"
        error={errors.repeatPassword && errors.repeatPassword.length>0}
        helperText={errors.repeatPassword && errors.repeatPassword.join(". ")}
        label="Repetir Contraseña"
        type="password"
        key="repeat-password"
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
      />
    </>
  )
}
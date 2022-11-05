import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/authentication/AuthContext'
import { Button } from '@mui/material'
import { InvalidResquest } from '../InvalidResquest/InvalidResquest'

export const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isInvalid, setIsInvalid] = useState(false)

  let onLogin = useContext(AuthContext)?.onLogin

  // The form will submit using fetch
  function submitFormHandler(e: React.FormEvent) {
    e.preventDefault()
    fetch(`/api/v1/users/login`, {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res: any) => {
        return res.json()
      })
      .then((res) => {
        if (res.status === 'success') {
          // Add token to AuthContext
          if (onLogin) {
            onLogin(res.result)
          }
        } else {
          setIsInvalid(true)
        }
      })
      .catch((e) => {
        console.error(e)
        setIsInvalid(true)
      })
  }
  return (
    <Box
      component='form'
      sx={{
        '& > :not(style)': { m: 1, width: '350px' },
        display: 'flex',
        flexDirection: 'column',
      }}
      autoComplete='off'
      onSubmit={submitFormHandler}
    >
      <TextField
        required
        label='E-mail'
        type='email'
        placeholder='example@gmail.com'
        name='value'
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <TextField
        label='Password'
        required
        type='password'
        name='value'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
        value={password}
      />
      {isInvalid && <InvalidResquest />}
      <Button type='submit' variant='contained' role='SubmitButton'>
        Login In
      </Button>
    </Box>
  )
}

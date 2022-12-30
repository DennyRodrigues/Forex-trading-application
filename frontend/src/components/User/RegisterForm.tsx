import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InvalidResquest } from '../InvalidResquest/InvalidResquest'
import { Box, TextField, Button } from '@mui/material'

export const RegisterForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isInvalid, setIsInvalid] = useState(false)
  const navigate = useNavigate()

  // The form will submit using fetch
  function submitFormHandler(e: any) {
    setIsInvalid(false)
    e.preventDefault()
    fetch(`/api/v1/users/register`, {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    })
      .then((res) => {
        if (res.status === 201) {
          // Reset input fields on form
          setName('')
          setEmail('')
          setPassword('')
          navigate('/login')
        } else {
          setIsInvalid(true)
        }
      })
      .catch((e) => {
        console.log(e)
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
        label='Name'
        placeholder='John Erick'
        name='value'
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setName(e.target.value)
        }
      />
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
        required
        label='Password'
        type='password'
        name='value'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
        value={password}
      />
      {isInvalid && <InvalidResquest />}
      <Button type='submit' variant='contained' role='SubmitButton'>
        Register
      </Button>
    </Box>
  )
}

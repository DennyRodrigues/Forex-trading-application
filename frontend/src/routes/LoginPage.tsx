import { LoginForm } from '../components/User/LoginForm'
import { Link } from 'react-router-dom'
import { Box, Typography } from '@mui/material'

export const LoginPage = () => {
  return (
    <div className='container'>
      <Box sx={{ mb: '1.4rem', boxShadow: '0 1px 2px rgb(0 0 0 / 5%)' }}>
        <Typography variant='h4'>Let's start the tradings</Typography>
      </Box>
      <LoginForm />
      <Link to='/register' className='link mt-4'>
        <Typography variant='body1'>New? Register now</Typography>
      </Link>
    </div>
  )
}

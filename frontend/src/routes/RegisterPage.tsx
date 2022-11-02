import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { RegisterForm } from '../components/User/RegisterForm'

export const RegisterPage = () => {
  return (
    <div className='container'>
      <Box sx={{ mb: '1.4rem' }}>
        <Typography variant='h4'>Registration</Typography>
      </Box>
      <RegisterForm />
      <Link to='/login' className='link mt-4'>
        <Typography variant='body1'>
          Already have an account? Login in
        </Typography>
      </Link>
    </div>
  )
}

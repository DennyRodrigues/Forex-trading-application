import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import { Link } from 'react-router-dom'

export const NavLinks = () => {
  return (
    <Box sx={{ display: 'flex', gap: '1rem' }}>
      <Link to='/' className='link'>
        <Typography variant='h6'>Trade</Typography>
      </Link>
      <Link to='/past' className='link'>
        <Typography variant='h6'>Past Trades</Typography>
      </Link>
    </Box>
  )
}

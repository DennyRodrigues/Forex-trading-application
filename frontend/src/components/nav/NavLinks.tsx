import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import { Link } from 'react-router-dom'

export const NavLinks = () => {
  return (
    <Box sx={{ display: 'flex', gap: '1rem' }}>
      <Link to='/'>
        <Typography
          variant='h6'
          sx={{ color: 'white', textDecoration: 'none' }}
        >
          Trade
        </Typography>
      </Link>
      <Link to='/past'>
        <Typography
          variant='h6'
          sx={{ color: 'white', textDecoration: 'none' }}
        >
          Past Trades
        </Typography>
      </Link>
    </Box>
  )
}

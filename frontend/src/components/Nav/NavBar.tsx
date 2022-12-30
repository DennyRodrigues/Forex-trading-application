import { Box, Typography } from '@mui/material'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/authentication/AuthContext'
import { UserInfo } from '../User/UserInfo'
import { NavLinks } from './NavLinks'

export const NavBar = () => {
  const token = useContext(AuthContext)?.token

  if (token) {
    return (
      <Box
        sx={{
          backgroundColor: 'rgba(21,101,192, 0.75)',
          height: '64px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: {
            xs: '0 5px',
            md: '1rem',
          },
          boxShadow:
            'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;',
        }}
      >
        <NavLinks />
        <UserInfo />
      </Box>
    )
  } else {
    return (
      <Box
        sx={{
          backgroundColor: 'rgba(21,101,192, 0.75)',
          height: '64px',
          padding: '1rem',
          boxShadow:
            'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;',
        }}
      >
        <Typography variant='h6' sx={{ color: 'white' }}>
          🌀 Forex Trading App
        </Typography>
      </Box>
    )
  }
}

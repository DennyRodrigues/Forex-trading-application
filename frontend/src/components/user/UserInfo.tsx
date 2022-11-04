import React, { useContext } from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import { AuthContext } from '../../contexts/authentication/AuthContext'
import { Typography } from '@mui/material'

export const UserInfo = () => {
  const user = useContext(AuthContext)?.user
  const onLogout = useContext(AuthContext)?.onLogout
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleLogout = () => {
    onLogout && onLogout()
  }
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Button
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
          color: 'white',

          padding: {
            xs: '4px 8px',
            sm: '8px 16px',
            md: '10px 18px',
          },

          backgroundColor: 'rgb(21,101,192)',
          boxShadow: '0 3px 6px rgba(0,0,0,0.5)',
        }}
      >
        <Typography variant='body2'>📊 My Account</Typography>
      </Button>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        PaperProps={{
          sx: { padding: '0 10px' },
        }}
      >
        <Typography
          variant='h6'
          sx={{
            margin: '10px',
            textAlign: 'center',
            borderBottom: '1px solid rgba(122,122,255,0.2)',
            bgcolor: 'rgba(122,122,255,0.1)',
          }}
        >
          💼 Wallet
        </Typography>
        <Typography variant='body2' sx={{ marginBottom: '5px' }}>
          {user?.name}
        </Typography>

        {user?.wallet &&
          Object.entries(user.wallet).map(([key, value]) => {
            return (
              <MenuItem
                onClick={handleClose}
                key={key}
                sx={{ border: '1px solid rgba(0,0,0,0.2)' }}
              >
                {`${key}: ${value.toFixed(2).toString()}`}
              </MenuItem>
            )
          })}
        <Button
          fullWidth
          sx={{
            marginTop: '20px',
            bgcolor: 'rgba(255,0, 0, 0.8)',
            borderRadius: '5px',
            '&:hover': {
              bgcolor: 'rgba(255,0, 0, 0.6);',
            },
          }}
          onClick={handleLogout}
        >
          <Typography variant='body1' sx={{ color: 'white' }}>
            ❌ Logout
          </Typography>
        </Button>
      </Menu>
    </div>
  )
}

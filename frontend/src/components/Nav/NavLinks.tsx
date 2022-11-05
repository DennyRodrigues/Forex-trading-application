import { Box } from '@mui/system'

import { NavLink } from './NavLink'

export const NavLinks = () => {
  return (
    <Box sx={{ display: 'flex', gap: '1rem' }}>
      <NavLink text='Trade' route='/' />
      <NavLink text='Past Trades' route='/past' />
    </Box>
  )
}

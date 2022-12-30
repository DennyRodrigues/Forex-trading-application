import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'

interface INavLink {
  text: string
  route: string
}

export const NavLink = ({ text, route }: INavLink) => {
  return (
    <Link to={route} className='nav-link'>
      <Typography variant='h6'>{text}</Typography>
    </Link>
  )
}

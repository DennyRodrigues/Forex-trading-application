import { Box, Typography } from '@mui/material'
import { useContext } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { AuthContext } from '../../contexts/authentication/AuthContext'
import { UserInfo } from '../user/UserInfo'

export const NavBarComponent = (props: any) => {
  const onLogout = useContext(AuthContext)?.onLogout
  const token = useContext(AuthContext)?.token

  if (token) {
    return (
      <Container>
        <RigthContainer>
          <StyledNavBar collapseOnSelect expand='sm'>
            <StyledToggle aria-controls='responsive-navbar-nav' />
            <StyledCollpse id='responsive-navbar-nav'>
              <StyledNav>
                <StyledLink to='/'>Trade</StyledLink>
                <StyledLink to='/past'>Past Trades</StyledLink>
              </StyledNav>
            </StyledCollpse>
          </StyledNavBar>
        </RigthContainer>
        <UserInfoContainer>
          <UserInfo />
        </UserInfoContainer>
      </Container>
    )
  } else {
    return (
      <Box
        sx={{
          backgroundColor: 'rgba(21,101,192, 0.75)',
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

const Container = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  width: 100%;
  padding: 1rem 0rem;
  height: 6rem;
  background-color: #87cefa;
`
const RigthContainer = styled.div`
  overflow: visible;
`
const StyledNavBar = styled(Navbar)`
  overflow: visible;
  background-color: #796678;
`
const StyledToggle = styled(Navbar.Toggle)`
  margin-left: 2rem;
`
const StyledCollpse = styled(Navbar.Collapse)`
  @media (max-width: 576px) {
    padding-bottom: 2rem;
  }
`
const StyledNav = styled(Nav)``
const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  text-transform: uppercase;
  margin-left: 1rem;
  @media (max-width: 576px) {
    margin-top: 2rem;
  }
`

const UserInfoContainer = styled.div`
  margin-left: auto;
  margin-right: 1rem;
  margin-top: 1rem;
`

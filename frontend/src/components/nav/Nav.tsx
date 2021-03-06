import { useContext } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../contexts/authentication/AuthContext";
import { UserInfo } from "../user/UserInfo";

export const NavBarComponent = (props: any) => {
  const onLogout = useContext(AuthContext)?.onLogout;
  const token = useContext(AuthContext)?.token;

  if (token) {
    return (
      <Container>
        <RigthContainer>

      <StyledNavBar collapseOnSelect expand="sm">
        <StyledToggle aria-controls='responsive-navbar-nav'/>
        <StyledCollpse id="responsive-navbar-nav">
          <StyledNav>
            <StyledLink to="/">
                  Trade
            </StyledLink>
            <StyledLink to="/past">
            Past Trades
              </StyledLink>
          </StyledNav>
        </StyledCollpse>
          </StyledNavBar>
        </RigthContainer>
        <UserInfoContainer>
          <UserInfo />
        </UserInfoContainer>
      </Container>
    );
  } else {
    return (
      <ul className="nav">
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li>
      </ul>
    );
  }
};


const Container = styled.div`
position: fixed;
display: flex;
flex-direction: row;
justify-content: space-between;

width: 100%;
padding: 1rem 0rem;
height: 6rem;
background-color: #796678;

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
@media(max-width:576px){
  padding-bottom: 2rem;
}

`
const StyledNav = styled(Nav)`
`
const StyledLink = styled(Link)`
color:#fff;
text-decoration: none;
text-transform: uppercase;
margin-left: 1rem;
@media(max-width:576px){
  margin-top: 2rem;
}
`

const UserInfoContainer = styled.div`
  margin-left:auto;
  margin-right: 1rem;
  margin-top: 1rem;
`

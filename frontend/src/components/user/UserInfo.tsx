import { useContext } from "react";
import { Button, Dropdown } from "react-bootstrap";
import styled from "styled-components";
import { AuthContext } from "../../contexts/authentication/AuthContext";

export const UserInfo = () => {
  const user = useContext(AuthContext)?.user;
  const onLogout = useContext(AuthContext)?.onLogout;


  return (
    <Dropdown className="user-info">
      <Dropdown.Toggle>My account</Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item className="user-info__text text-center" disabled>
          {user?.name?.toLocaleUpperCase()}
        </Dropdown.Item>
        <WalletContainer>
        <WalletTitle>
          Wallet
        </WalletTitle>
          <WalletList>
        {user?.wallet &&
          Object.entries(user.wallet).map(([key, value]) => {
            return (
              <WalletItemAmount
                className={`user-info__wallet__value user-info__wallet--${key}`}
                key={key}
                disabled
              >
                {key} = {""}
                {value.toFixed(2).toString()}
              </WalletItemAmount>
            );
          })}
          </WalletList>
        </WalletContainer>
        <LogoutButtonContainer>
        {onLogout && <LogoutButton onClick={() => onLogout()}>
            Log off        </LogoutButton>}
        </LogoutButtonContainer>


      </Dropdown.Menu>
    </Dropdown>
  );
};

const WalletContainer = styled.div`
  border: 1px solid #000;
`
const WalletTitle = styled.h3`
  text-align: center;
  font-weight: 400;
  font-size: 2.1rem;
  margin-bottom: 0;
`
const WalletList = styled.ul`
  list-style: none;
  margin:0;
  padding:0;
`
const WalletItemAmount = styled(Dropdown.Item)`
  border: 1px solid #000;
`
const LogoutButtonContainer = styled.div`
margin: auto auto;
display: flex;
justify-content: center;
align-items: center;
`
const LogoutButton = styled(Button)`
  margin: auto auto;
  text-align: center;
  font-weight: 400;
  font-size: 3rem;
  color: #333;
  margin-bottom: 0;
  background-color: transparent;
  border: none;
  &:active, &:hover, &:focus{
    background-color: transparent;
    color: #333;
    font-weight: 500;
  }
`

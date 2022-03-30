import { useContext } from "react";
import { Dropdown } from "react-bootstrap";
import { AuthContext } from "../authentication/AuthContext";

export const UserInfo = () => {
  const user = useContext(AuthContext)?.user;


  return (
    <Dropdown className="user-info">
      <Dropdown.Toggle>My account</Dropdown.Toggle>
      <Dropdown.Menu>

        <Dropdown.Item className="user-info__text">
            {user?.name?.toLocaleUpperCase()}
        </Dropdown.Item>
            {user?.wallet &&
              Object.entries(user.wallet).map(([key, value]) => {
                return (
                  <Dropdown.Item
                    className={`user-info__wallet__value user-info__wallet--${key}`}
                    key={key}
                  >
                    {key} = {""}
                    {value.toFixed(2).toString()}
                  </Dropdown.Item>
                );
              })}
      </Dropdown.Menu>
    </Dropdown>
  );
};

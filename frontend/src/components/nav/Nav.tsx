import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/authentication/AuthContext";
import { UserInfo } from "../user/UserInfo";

export const Nav = (props: any) => {
  const onLogout = useContext(AuthContext)?.onLogout;
  const token = useContext(AuthContext)?.token;

  if (token) {
    return (
      <ul className="nav" >
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Trade
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/past" className="nav-link">
            Past Trades
          </Link>
        </li>
        <li className="nav-item nav-user-info">
          <UserInfo />
        </li>
        <li className="nav-item log-off">
          {onLogout && (
            <button className="btn nav-text " onClick={() => onLogout()}>
              Log off
            </button>
          )}
        </li>
      </ul>
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

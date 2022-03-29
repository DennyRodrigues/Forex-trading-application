import { useContext } from "react";
import { AuthContext } from "../authentication/AuthContext";

export const UserInfo = () => {
  const user = useContext(AuthContext)?.user;


  return (
    <div className="user-info">
      <p className="user-info__text">
        Name:
        <span className="user-info__name">{user?.name}</span>
      </p>
      <p className="user-info__text">
        wallet:
        {user?.wallet ? Object.entries(user?.wallet).map(([key, value]) => {
          return (
            <span className={`user-info__wallet user-info__wallet--${key}`
        } key={key}>
              {value.toFixed(2).toString()}
              {key}
            </span>
          );   
          }):''}
      </p>
    </div>
  );
};

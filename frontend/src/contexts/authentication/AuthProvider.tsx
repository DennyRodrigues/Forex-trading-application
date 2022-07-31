import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { useState } from "react";
import { User, UserContext } from "../../types/User";

export const AuthProvider = (props: any) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserContext | null>(
    null
  );
  const navigate = useNavigate();

  const handleLogin = (response: User) => {
    setToken(response.token);
    setUser({ name: response.name, wallet: response.wallet });
    navigate("/", { replace: true });
  };

  const handleLogout = () => {
    setToken("");
  };

  const updateUser = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/users/me`, {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res: Response) => res.json())
      .then((res: any) => {
        setUser({ name: res.result.name, wallet: res.result.wallet });
      })
      .catch((e: Error) => console.log(e));
  };

  const value = {
    user: user,
    token: token,
    updateUser: updateUser,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

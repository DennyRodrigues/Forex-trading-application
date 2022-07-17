import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { useState } from "react";

export const AuthProvider = (props: any) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<{ name: string; wallet: { JPY: number, USD: number } } | null>(
    null
  );
  const navigate = useNavigate();

  const handleLogin = (response: {
    name: string;
    token: string;
    wallet: {
      JPY: number,
      USD: number,
    };
  }) => {
    setToken(response.token);
    setUser({ name: response.name, wallet: response.wallet });
    navigate("/", { replace: true });
  };

  const handleLogout = () => {
    setToken("");
  };

  const updateUser = () => {
    fetch(`http://localhost:${process.env.REACT_APP_API_PORT}/api/v1/users/me`, {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res: any) => res.json())
      .then((res) => {
        setUser({ name: res.result.name, wallet: res.result.wallet });
      })
      .catch((e) => console.log(e));
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

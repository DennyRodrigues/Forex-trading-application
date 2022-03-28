import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";



export const AuthProvider = (props:any) => {
  const [token, setToken] = useState<string | null>(null);
  let navigate = useNavigate();
    

  const handleLogin = (token: string) => {
    console.log(token)
    setToken(token);
    navigate("/", { replace: true });

  };

  const handleLogout = () => {
    setToken('');
  };

  const value = {
    token: token,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}
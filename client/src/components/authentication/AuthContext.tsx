import { createContext } from "react";


interface value{
  token:string | null,
  onLogin:Function,
  onLogout:Function,
};

export const AuthContext = createContext<value| null>(null);

import { createContext } from "react";


interface value {
  user:null|{
    name: string|null;
    wallet: {
      USD: number,
      GBP:number
    }|null;
  },
  token: string | null;
  updateUser: Function;
  onLogin: Function;
  onLogout: Function;
};

export const AuthContext = createContext<value | null>(null);

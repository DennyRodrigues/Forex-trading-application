import { createContext } from 'react'

export interface AuthContextInterface {
  user: {
    name: string
    wallet: {
      JPY: number
      USD: number
    }
  } | null
  token: string
  updateUser: Function
  onLogin: Function
  onLogout: Function
}

export const AuthContext = createContext<AuthContextInterface | null>(null)

import { useNavigate } from 'react-router-dom'
import { AuthContext } from './AuthContext'
import { useState } from 'react'
import { ServerResponseLogin, User } from '../../types/User'

interface Props {
  children: React.ReactNode
}
const development_URL = process.env.REACT_APP_BASE_URL || ''

export const AuthProvider = ({ children }: Props) => {
  const [token, setToken] = useState('')
  const [user, setUser] = useState<User | null>(null)
  const navigate = useNavigate()

  const handleLogin = (response: ServerResponseLogin) => {
    setToken(response.token)
    setUser({ name: response.name, wallet: response.wallet })
    navigate('/', { replace: true })
  }

  const handleLogout = () => {
    setToken('')
  }

  const updateUser = () => {
    fetch(`${development_URL}/api/v1/users/me`, {
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res: Response) => res.json())
      .then((res: any) => {
        setUser({ name: res.result.name, wallet: res.result.wallet })
      })
      .catch((e: Error) => console.log(e))
  }

  const value = {
    user,
    token,
    updateUser,
    onLogin: handleLogin,
    onLogout: handleLogout,
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

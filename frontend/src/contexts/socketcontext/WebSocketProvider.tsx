import { useState, useEffect, useMemo, useContext } from 'react'
import { createContext } from 'react'
import { IExchangeRate, IWebSocketContext } from '../../types/trade'
import io from 'socket.io-client'

const WebSocketContext = createContext<IWebSocketContext | null>(null)

interface IWebSocketProvider {
  children: React.ReactNode
}
const development_socket_url = process.env.REACT_APP_SOCKET_URL || ''
// The context will connect to the websocket on backend
export const WebSocketProvider = ({ children }: IWebSocketProvider) => {
  // The Exchange rate will use the USD as the base currency. They will be USD/BTC, USD/EUR. USD/JPY;
  const [ratesForUSD, setRatesForUSD] = useState<IExchangeRate[]>([
    { symbol: 'BTC', value: 0 },
    { symbol: 'EUR', value: 0 },
    { symbol: 'JPY', value: 0 },
  ])

  useEffect(() => {
    const socket = io(development_socket_url)
    console.log(
      '🚀 ~ file: WebSocketProvider.tsx ~ line 23 ~ useEffect ~ socket',
      socket
    )

    socket.on('connect', () => {
      console.log('Connectado')
    })
    socket.on('error', (e) => {
      console.log(e)
    })

    socket.on('message', (data) => {
      console.log(data)
      if (data) {
        setRatesForUSD((prev) => {
          return prev.map((rate) => {
            if (rate.symbol === data.symbol) {
              return data
            }
            return rate
          })
        })
      }
    })
  }, [])

  const value = useMemo(
    () => ({
      ratesForUSD,
    }),
    [ratesForUSD]
  )

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  )
}

// Hooks
export const useExchangeRates = () => {
  const contextValues = useContext(WebSocketContext)
  return contextValues?.ratesForUSD
}

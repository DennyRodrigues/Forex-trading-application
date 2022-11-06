import { useState, useEffect, useMemo, useContext } from 'react'
import { createContext } from 'react'
import { IExchangeRate, IWebSocketContext } from '../../types/trade'
import CreateIO from 'socket.io-client'

const WebSocketContext = createContext<IWebSocketContext | null>(null)
const development_socket_url = process.env.REACT_APP_SOCKET_URL || ''

interface IWebSocketProvider {
  children: React.ReactNode
}
// The context will connect to the websocket on backend
export const WebSocketProvider = ({ children }: IWebSocketProvider) => {
  // The Exchange rate will use the USD as the base currency. They will be USD/BTC, USD/EUR. USD/JPY;
  const [ratesForUSD, setRatesForUSD] = useState<IExchangeRate[]>([
    { symbol: 'BTC', value: 0 },
    { symbol: 'EUR', value: 0 },
    { symbol: 'JPY', value: 0 },
  ])

  useEffect(() => {
    const io = CreateIO(development_socket_url)
    console.log(
      '🚀 ~ file: WebSocketProvider.tsx ~ line 26 ~ useEffect ~ io',
      io
    )

    io.on('message', (data) => {
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

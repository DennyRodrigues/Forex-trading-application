import { useState, useEffect, useMemo, useContext } from 'react'
import { createContext } from 'react'
import { IExchangeRate, IWebSocketContext } from '../../types/trade'
import CreateIO from 'socket.io-client'

const WebSocketContext = createContext<IWebSocketContext | null>(null)

interface IWebSocketProvider {
  children: React.ReactNode
}
// The context will connect to the websocket on backend
export const WebSocketProvider = ({ children }: IWebSocketProvider) => {
  const development_socket_url = process.env.REACT_APP_SOCKET_URL || ''
  // The Exchange rate will use the USD as the base currency. They will be USD/BTC, USD/EUR. USD/JPY;
  const [ratesForUSD, setRatesForUSD] = useState<IExchangeRate[]>([
    { symbol: 'BTC', value: 0 },
    { symbol: 'EUR', value: 0 },
    { symbol: 'JPY', value: 0 },
  ])

  useEffect(() => {
    console.log('Creating socket')
    console.log('development_socket_url:', development_socket_url)
    const io = CreateIO(development_socket_url)
    console.log(
      '🚀 ~ file: WebSocketProvider.tsx ~ line 26 ~ useEffect ~ io',
      io
    )

    io.on('connect', () => {
      console.log('Connectado')
    })
    io.on('error', (e) => {
      console.log(e)
    })

    io.on('message', (data) => {
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
  }, [development_socket_url])

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

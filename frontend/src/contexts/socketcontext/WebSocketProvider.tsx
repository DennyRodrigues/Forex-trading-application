import { useState, useEffect, useMemo, useContext } from 'react'
import { createContext } from 'react'
import { ExchangeRate, IWebSocketContext } from '../../types/Trade'
import CreateIO from 'socket.io-client'

const WebSocketContext = createContext<IWebSocketContext | null>(null)

interface IWebSocketProvider {
  children: React.ReactNode
}
// The context will connect to the websocket on backend
export const WebSocketProvider = ({ children }: IWebSocketProvider) => {
  const socketUrl = `${window.location}:${
    process.env.REACT_APP_WEBSOCKET_PORT || 5001
  }`
  console.log(socketUrl)
  // The Exchange rate will use the USD as the base currency. They will be USD/BTC, USD/EUR. USD/JPY;
  const [ratesForUSD, setRatesForUSD] = useState<ExchangeRate[]>([
    { symbol: 'BTC', value: 0 },
    { symbol: 'EUR', value: 0 },
    { symbol: 'JPY', value: 0 },
  ])

  useEffect(() => {
    const io = CreateIO()
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

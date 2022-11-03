import { useState, useEffect, useMemo, useContext } from 'react'
import io from 'socket.io-client'
import { createContext } from 'react'
import { ExchangeRate, IWebSocketContext } from '../../types/Trade'

const WebSocketContext = createContext<IWebSocketContext | null>(null)

// The context will connect to the websocket on backend
export const WebSocketProvider = (props: any) => {
  const socketUrl = process.env.REACT_APP_SOCKET_URL || ''
  console.log(socketUrl)
  // The Exchange rate will use the USD as the base currency. They will be USD/BTC, USD/EUR. USD/JPY;
  const [ratesForUSD, setRatesForUSD] = useState<ExchangeRate[]>([
    { symbol: 'BTC', value: 0 },
    { symbol: 'EUR', value: 0 },
    { symbol: 'JPY', value: 0 },
  ])

  useEffect(() => {
    const socket = io(socketUrl)
    socket.on('message', (data) => {
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
  }, [socketUrl])

  const value = useMemo(
    () => ({
      ratesForUSD,
    }),
    [ratesForUSD]
  )

  return (
    <WebSocketContext.Provider value={value}>
      {props.children}
    </WebSocketContext.Provider>
  )
}

// Hooks
export const useExchangeRates = () => {
  const contextValues = useContext(WebSocketContext)
  return contextValues?.ratesForUSD
}

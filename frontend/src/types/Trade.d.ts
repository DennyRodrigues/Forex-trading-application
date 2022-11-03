export interface ExchangeRate {
  symbol: string
  value: number
}

export interface IWebSocketContext {
  ratesForUSD: ExchangeRate[]
}

export interface ITradePayload {
  entrySymbol: string
  exitSymbol: string
  exchangeRate: number
  value: number
}

export interface IExchangeRate {
  symbol: string
  value: number
}

export interface IWebSocketContext {
  ratesForUSD: IExchangeRate[]
}

export interface ITradePayload {
  entrySymbol: string
  exitSymbol: string
  exchangeRate: number
  value: number
}

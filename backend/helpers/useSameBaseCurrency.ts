// Transform all the exchange rate from API to use USD as the base currency, and also remove the USD from the symbol exchange:
import type { IExchangeRate } from './../types/trade'

export const useSameBaseCurrency = (exchange: IExchangeRate) => {
  const splitedSymbols = exchange.symbol.split('/')
  const firstSymbol = splitedSymbols[0]
  const lastSymbol = splitedSymbols[1]
  if (firstSymbol !== 'USD') {
    // It's necessary to invert the exchange value, to keep it valid
    return {
      symbol: firstSymbol,
      value: 1 / exchange.value,
    }
  } else {
    return {
      symbol: lastSymbol,
      value: exchange.value,
    }
  }
}

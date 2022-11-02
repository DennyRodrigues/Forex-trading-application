export interface User {
  name: string
  wallet: {
    JPY: number
    USD: number
    BTC: number
    EUR: number
  }
}

export interface ServerResponseLogin extends User {
  token: string
}

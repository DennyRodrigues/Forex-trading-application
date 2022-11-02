import { RequireAuth } from '../contexts/authentication/RequireAuth'
import { WebSocketProvider } from '../contexts/socketcontext/WebSocketProvider'
import { ExchangeRatesTable } from '../components/ExchangeRatesTable/ExchangeRatesTable'
import { SellUSDForm } from '../components/MakeTrade/SellUSDForm'
import { BuyUSDForm } from '../components/MakeTrade/BuyUSDForm'

export const Home = () => {
  return (
    <RequireAuth>
      <WebSocketProvider>
        <div className='container'>
          <div className='wrapper'>
            <ExchangeRatesTable />
            <div className='trade-container'>
              <SellUSDForm entrySymbol='USD' />
            </div>
            <div className='trade-container'>
              <BuyUSDForm entrySymbol='USD' />
            </div>
          </div>
        </div>
      </WebSocketProvider>
    </RequireAuth>
  )
}

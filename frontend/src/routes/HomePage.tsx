import { RequireAuth } from '../contexts/authentication/RequireAuth'
import { WebSocketProvider } from '../contexts/socketcontext/WebSocketProvider'
import { ExchangeRatesTable } from '../components/ExchangeRatesTable/ExchangeRatesTable'
import { MakeTradeForm } from '../components/MakeTrade/MakeTradeForm'
import { Box } from '@mui/material'

export const Home = () => {
  return (
    <RequireAuth>
      <WebSocketProvider>
        <div className='container'>
          <div className='wrapper'>
            <ExchangeRatesTable />
            <Box
              sx={{
                boxShadow: '0 1px 3px rgba(0,0,155,0.35)',
                borderRadius: '5px',
                padding: '2rem 1rem',
              }}
            >
              <MakeTradeForm entrySymbol='USD' />
            </Box>
          </div>
        </div>
      </WebSocketProvider>
    </RequireAuth>
  )
}

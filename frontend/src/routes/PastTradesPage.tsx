import { RequireAuth } from '../contexts/authentication/RequireAuth'
import { PastTrades } from '../components/PastTrades/PastTrades'

export const PastTradesPage = () => {
  return (
    <RequireAuth>
      <div className='container'>
        <PastTrades />
      </div>
    </RequireAuth>
  )
}

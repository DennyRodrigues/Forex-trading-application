import { RequireAuth } from '../contexts/authentication/RequireAuth'
import { PastTradesTable } from '../components/PastTrades/PastTrades'

export const PastTradesPage = () => {
  return (
    <RequireAuth>
      <div className='container'>
        <PastTradesTable />
      </div>
    </RequireAuth>
  )
}

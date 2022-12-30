import styled from 'styled-components'
import { useExchangeRates } from '../../contexts/socketcontext/WebSocketProvider'
import { IExchangeRate } from '../../types/trade'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

export const ExchangeRatesTable = () => {
  const exchangeRates = useExchangeRates()

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ borderTop: '1px solid rgba(122,122,122, 0.2)' }}
      >
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: '0.9rem' }}>Currency</TableCell>
              <TableCell sx={{ fontSize: '0.9rem' }} align='right'>
                Excharge Rate
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {exchangeRates?.map((exchange: IExchangeRate) => (
              <TableRow
                key={exchange.symbol}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {exchange.symbol}
                </TableCell>
                <TableCell align='right'>
                  {exchange.value ? exchange.value.toFixed(10) : 'loading...'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <StyledLabel>
        Each value shows the exchange for 1 USD (United States dollar)
      </StyledLabel>
    </>
  )
}

const StyledLabel = styled.p`
  text-align: center;
  font-size: 0.8rem;
  margin-bottom: 2rem;
`

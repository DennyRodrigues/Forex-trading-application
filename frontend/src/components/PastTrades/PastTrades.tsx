import { useEffect, useContext, useState } from 'react'
import { AuthContext } from '../../contexts/authentication/AuthContext'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

export const PastTrades = () => {
  let token = useContext(AuthContext)?.token

  const [trades, setTrades] = useState<[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/trades`, {
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setTrades(res.result.trades)
        setIsLoading(false)
      })
      .catch((e) => {
        console.log(e)
        setIsLoading(false)
      })
  }, [token])

  if (trades) {
    if (trades?.length > 0) {
      return (
        <TableContainer
          component={Paper}
          sx={{
            borderTop: '1px solid rgba(122,122,122, 0.2)',
            maxWidth: '1000px',
          }}
        >
          <Table size='small' aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align='center'>Date</TableCell>
                <TableCell align='right'>Paid</TableCell>
                <TableCell align='right'>Received</TableCell>
                <TableCell align='right'>Rate</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* /* It will receive the trades array, to render the most recents first */}
              {trades
                .slice(0)
                .reverse()
                .map((trade: any, index) => {
                  const date = new Date(trade.date).toLocaleDateString(
                    'pt-BR',
                    {
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                      second: 'numeric',
                    }
                  )
                  return (
                    <TableRow key={index}>
                      <TableCell>{trades.length - index}</TableCell>
                      <TableCell align='center'>{date}</TableCell>
                      <TableCell align='right'>
                        {Number(trade.entryAmount).toFixed(2)}
                        {trade.entrySymbol}
                      </TableCell>
                      <TableCell align='right'>
                        {Number(trade.exitAmount).toFixed(2)}
                        {trade.exitSymbol}
                      </TableCell>
                      <TableCell align='right'>
                        {trade.exchangeRate.toFixed(6)}
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
      )
    } else {
      return <p>No past trades were found</p>
    }
  } else if (isLoading) {
    return <p>Loading past trades...</p>
  } else {
    return <p>ERROR: Unable to connect with server</p>
  }
}

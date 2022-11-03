import { Typography } from '@mui/material'
import styled from 'styled-components'

type IProps = {
  exitAmount: number
}
export const TradeCalculation: React.FC<IProps> = ({ exitAmount }) => {
  console.log('exitAmount:', exitAmount)
  return (
    <Container>
      <Typography>
        {isNaN(exitAmount) ? 'Loading...' : exitAmount.toFixed(6)}
      </Typography>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  text-align: end;
`

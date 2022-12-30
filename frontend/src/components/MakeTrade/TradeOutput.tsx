import React from 'react'
import styled from 'styled-components'
import { TradeCalculation } from './TradeCalculation'

interface IProps {
  exchangeOptions: string[]
  selectedExchange: string
  setSelectedExchange: React.Dispatch<React.SetStateAction<string>>
  exitAmount: number
}

export const TradeOutput: React.FC<IProps> = ({
  exchangeOptions,
  selectedExchange,
  setSelectedExchange,
  exitAmount,
}) => {
  return (
    <Container>
      <StyledSelectInput
        value={selectedExchange}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSelectedExchange(e.target.value)
        }
        title='Exchange Currency'
      >
        {exchangeOptions.map((option: string) => (
          <StyledOption key={option}>{option}</StyledOption>
        ))}
      </StyledSelectInput>
      <TradeCalculation exitAmount={exitAmount}></TradeCalculation>
    </Container>
  )
}

const StyledSelectInput = styled.select`
  display: flex;
`
const StyledOption = styled.option``
const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 2rem;
`

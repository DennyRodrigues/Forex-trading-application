import React from 'react'
import styled from 'styled-components'

interface IProps {
  exchangeOptions: string[]
  selectedExchange: string
  setSelectedExchange: React.Dispatch<React.SetStateAction<string>>
}

export const SelectCurrency: React.FC<IProps> = ({
  exchangeOptions,
  selectedExchange,
  setSelectedExchange,
}) => {
  return (
    <StyledSelectInput
      value={selectedExchange}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setSelectedExchange(e.target.value)
      }
      title='Exchange Currency'
    >
      {exchangeOptions.map((option: any) => (
        <option key={option}>{option}</option>
      ))}
    </StyledSelectInput>
  )
}

const StyledSelectInput = styled.select`
  width: 100%;
  font-family: inherit;
  padding: 2px 3px;
  border-radius: 5px;
`

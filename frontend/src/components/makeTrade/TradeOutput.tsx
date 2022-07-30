import React from "react";
import styled from "styled-components"
import { TradeCalculation } from "./TradeCalculation"

interface IProps {
  exchangeOptions: string[];
  selectedExchange: string;
  setSelectedExchange: React.Dispatch<React.SetStateAction<string>>;
  exitAmount: number;
  entryAmount: string;
};

export const TradeOutput: React.FC<IProps> = ({ exchangeOptions, selectedExchange, setSelectedExchange, exitAmount, entryAmount }) => {
  return (
  <Container>
    <StyledSelectInput
      value={selectedExchange}
      onChange={(e) => setSelectedExchange(e.target.value)}
      title="Exchange Currency"
    >
      {exchangeOptions.map((option : any) => <StyledOption>{option}</StyledOption>)}

    </StyledSelectInput>
      <TradeCalculation exitAmount={exitAmount} isLoading={Number(entryAmount) > 0 && exitAmount <= 0}></TradeCalculation>
  </Container>
  )
}


const StyledSelectInput = styled.select`
display: flex;
`
const StyledOption = styled.option`

`
const Container = styled.div`
display: flex;
flex-direction: column;
flex: 1;
padding: 0 2rem;
`

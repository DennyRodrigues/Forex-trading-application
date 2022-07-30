import React from "react";
import styled from "styled-components"

interface IProps {
  exchangeOptions: string[];
  selectedExchange: string;
  setSelectedExchange: React.Dispatch<React.SetStateAction<string>>;
};

export const SelectCurrency: React.FC<IProps> = ({ exchangeOptions, selectedExchange, setSelectedExchange }) => {
  return (
      <StyledSelectInput
        value={selectedExchange}
        onChange={(e) => setSelectedExchange(e.target.value)}
        title="Exchange Currency"
      >
        {exchangeOptions.map((option: any) => <StyledOption key={option}>{option}</StyledOption>)}

      </StyledSelectInput>
  )
}


const StyledSelectInput = styled.select`
display: flex;
`
const StyledOption = styled.option`

`


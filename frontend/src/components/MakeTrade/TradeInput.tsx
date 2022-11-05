import styled from "styled-components"

interface IProps {
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  entrySymbol?: string;
};


export const TradeInput: React.FC<IProps> = ({onChange, value, entrySymbol}) => {
  return (<Container>
    <StyledLabel>
      {entrySymbol && entrySymbol}
    </StyledLabel>
    <StyledInput
      type="number"
      placeholder="entry amount"
      name="value"
      onChange={onChange}
      value={value}
      min="0"
      max="500000"

    />
  </Container>)
} 

const Container = styled.div`
display: flex;
flex-direction: column;
flex: 1;
padding:0 2rem;
`

const StyledLabel = styled.label`
`
const StyledInput = styled.input`
border: none;
width: 10rem;
&:active {
  outline:none
}
&:focus {
  outline:none
}
`

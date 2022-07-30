import styled from "styled-components"

type IProps = {
  exitAmount: number;
  isLoading: boolean;
}
export const TradeCalculation: React.FC<IProps> = ({ exitAmount, isLoading }) => {

  return (
    <Container>
      <StyledText>
        {isLoading ? "Loading..." :  exitAmount.toFixed(6)}
      </StyledText>
    </Container>

  )
}

const Container = styled.div`
width: 100%;

`
const StyledText = styled.p`
text-align: center;
margin-bottom: 0;

`

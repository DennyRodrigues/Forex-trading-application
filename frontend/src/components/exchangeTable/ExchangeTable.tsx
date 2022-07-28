import styled from 'styled-components';
import { useExchangeRates } from '../../contexts/socketcontext/WebSocketProvider';
import { exchangeRate } from '../../types/Trade';


export const ExchangeTable = () => {
  const exchangeRates = useExchangeRates()


  return (
    <Container>
      <StyledTitle>Exchange rates </StyledTitle>
      {exchangeRates.map((rate : exchangeRate) => {
        return (
        <RowContainer>
            <RightContainer>
              <StyledText>
                {rate.symbol}:
              </StyledText>
            </RightContainer>
            <LeftContainer>
            <StyledText>
                {rate.value ? rate.value.toFixed(16) : "loading..."}
            </StyledText>
            </LeftContainer>
          </RowContainer>
        )
      })}
      <StyledLabel>Each values shows the exchange for 1 USD (United States dollar)</StyledLabel>

  </Container>
  )
}

const Container = styled.div`
    margin-bottom: 2rem;
`
const StyledTitle = styled.h2`
  text-align: center;
`
const RightContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
`
const LeftContainer = styled.div`
  margin-left: auto;
  display: flex;

  align-items: center;
  justify-content: center;
`
const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  gap: 4rem;

  padding: .2rem 2rem;
  border: 1px solid black;

`
const StyledText = styled.text`
  text-align: center;
`
const StyledLabel = styled.text`
  text-align: center;
  font-size: 0.8rem;
`

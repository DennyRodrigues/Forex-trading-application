import styled from 'styled-components'
import { useExchangeRates } from '../../contexts/socketcontext/WebSocketProvider'
import { ExchangeRate } from '../../types/Trade'

export const ExchangeRatesTable = () => {
  const exchangeRates = useExchangeRates()

  return (
    <Container>
      <StyledTitle>Exchange rates </StyledTitle>
      {exchangeRates.map((rate: ExchangeRate) => {
        return (
          <RowContainer key={rate.symbol}>
            <RightContainer>
              <StyledText>{rate.symbol}:</StyledText>
            </RightContainer>
            <LeftContainer>
              <StyledText>
                {rate.value ? rate.value.toFixed(10) : 'loading...'}
              </StyledText>
            </LeftContainer>
          </RowContainer>
        )
      })}
      <StyledLabel>
        Each value shows the exchange for 1 USD (United States dollar)
      </StyledLabel>
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

  padding: 0.2rem 2rem;
  border: 1px solid black;
`
const StyledText = styled.p`
  text-align: center;
`
const StyledLabel = styled.p`
  text-align: center;
  font-size: 0.8rem;
`

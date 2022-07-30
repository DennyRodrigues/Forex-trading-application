import "bootstrap/dist/css/bootstrap.css";
import Button from "react-bootstrap/Button";
import styled from 'styled-components'
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/authentication/AuthContext";
import { useExchangeRates } from "../../contexts/socketcontext/WebSocketProvider";
import { ExchangeRate } from "../../types/Trade";
import { TradeCalculation } from "./TradeCalculation";
import { TradeOutput } from "./TradeOutput";
import { TradeInput } from "./TradeInput";

export const TradeForm = (props: any) => {
  // Contexts
  const token = useContext(AuthContext)?.token;
  const updateUser = useContext(AuthContext)?.updateUser;

  // Props
  const entryAmount = props.entryAmount;
  const entrySymbol = props.entrySymbol;

  // Hooks 
  const webSocketRate = useExchangeRates();
  const [isInvalid, setIsInvalid] = useState(false);

  // States
  const [selectedExchangeSymbol, setSelectedExchangeSymbol] = useState("BTC");
  const [selectedExchangeRate, setSelectedExchangeRate] = useState<number>(0);

  // Consts
  const exchangeOptions = ["BTC", "EUR", "JPY"];

  // Effects  Update exchange rate
  useEffect(() => {
    setSelectedExchangeRate(webSocketRate.find((rate: ExchangeRate) => rate.symbol === selectedExchangeSymbol).value)
    console.info(selectedExchangeRate)
  }, [selectedExchangeSymbol])
  
  // Functions
  // The form will submit using fetch
  function onSubmitHandler(e: any) {
    e.preventDefault();

    setIsInvalid(false);

    fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/trades`, {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        date: new Date(),
        entrySymbol: entrySymbol,
        exitSymbol: selectedExchangeSymbol,
        exchangeRate: selectedExchangeRate,
        value: entryAmount,
      }),
    })
      .then((res: any) => res.json())
      .then((res) => {
        if (res.status === "success") {
          setIsInvalid(false);
          if (updateUser) {
            updateUser();
          }
        } else {
          setIsInvalid(true);
        }
      })
      .catch((e) => {
        console.log(e);
        setIsInvalid(true);
      });
  }

  
  return (
    <StyledForm onSubmit={onSubmitHandler} className="trade-form" role="form">
      <RowContainer>
        <InsideRowContainer>
          <TradeInput entrySymbol={entrySymbol} onChange={props.changeHandler} value={entryAmount} /> 
        </InsideRowContainer>

        <InsideRowContainer>
          <TradeOutput exitAmount={entryAmount * selectedExchangeRate}
            setSelectedExchange={setSelectedExchangeSymbol}
            selectedExchange={selectedExchangeSymbol}
            exchangeOptions={exchangeOptions}
            entryAmount={entryAmount}
          />
        </InsideRowContainer>
        
      </RowContainer>

      {isInvalid ? (
        <p className="error">Not able to make trade</p>
      ) : (
        <p className="error"></p>
      )}
      <Button
        className="w-100 fs-4 mt-1 p-0 button"
        type="submit"
        role="submitButton"
      >
        Trade
      </Button>
    </StyledForm>
  );
};

const StyledForm = styled.form`
`

const RowContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
gap: 2rem;
width: 32rem;
`
const InsideRowContainer = styled.div`
flex:1;

`

const StyledSelectInput = styled.select`
display: flex;

`

const StyledEqualSymbol = styled.p`
margin-bottom: 0;
font-weight: 700;
  
`

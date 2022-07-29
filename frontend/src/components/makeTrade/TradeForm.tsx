import "bootstrap/dist/css/bootstrap.css";
import Button from "react-bootstrap/Button";
import styled from 'styled-components'
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/authentication/AuthContext";
import { useExchangeRates } from "../../contexts/socketcontext/WebSocketProvider";
import { exchangeRate } from "../../types/Trade";
import { TradeCalculation } from "./TradeCalculation";
import { TradeOutput } from "./TradeOutput";
import { TradeInput } from "./TradeInput";

export const TradeForm = (props: any) => {
  const token = useContext(AuthContext)?.token;
  const updateUser = useContext(AuthContext)?.updateUser;

  const entryAmount = props.entryAmount;
  const entrySymbol = props.entrySymbol;
  const exitSymbol = props.exitSymbol;
  const webSocketRate = useExchangeRates();
  const [isInvalid, setIsInvalid] = useState(false);

  // States
  const [selectedExchange, setSelectedExchange] = useState("BTC")

  const exchangeOptions = ["BTC", "EUR", "JPY"];

  // It's necessary to invert the exchange rate depending if the user wants to exchange JPY -> USD or USD ->JPY
  let exchangeRate = 0;
  if (entrySymbol === "JPY") {
    exchangeRate = 1 / webSocketRate;
  }
  if (entrySymbol === "USD") {
    exchangeRate = webSocketRate;
  }


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
        exitSymbol: exitSymbol,
        exchangeRate: exchangeRate,
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
          <TradeOutput exitAmount={entryAmount * webSocketRate.find((rate: exchangeRate) => rate.symbol === selectedExchange).value}
            setSelectedExchange={setSelectedExchange}
            selectedExchange={selectedExchange}
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

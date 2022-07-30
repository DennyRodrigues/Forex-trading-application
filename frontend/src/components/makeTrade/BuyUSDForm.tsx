import "bootstrap/dist/css/bootstrap.css";
import Button from "react-bootstrap/Button";
import styled from 'styled-components'
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/authentication/AuthContext";
import { useExchangeRates } from "../../contexts/socketcontext/WebSocketProvider";
import { ExchangeRate } from "../../types/Trade";
import { TradeOutput } from "./TradeOutput";
import { TradeInput } from "./TradeInput";
import { SelectCurrency } from "./SelectCurrency/SelectCurrency";
import { TradeCalculation } from "./TradeCalculation";

export const BuyUSDForm = (props: any) => {
  // Contexts
  const token = useContext(AuthContext)?.token;
  const updateUser = useContext(AuthContext)?.updateUser;

  // Props
  const entrySymbol = props.entrySymbol;

  // Hooks 
  const webSocketRate = useExchangeRates();
  const [isInvalid, setIsInvalid] = useState(false);

  // States
  const [selectedExchangeSymbol, setSelectedExchangeSymbol] = useState("BTC");
  const [selectedExchangeRate, setSelectedExchangeRate] = useState<number>(0);
  const [entryAmount, setEntryAmount] = useState<string | number>(0);
  const [exitAmount, setexitAmount] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>('');


  // Consts
  const exchangeOptions = ["BTC", "EUR", "JPY"];

  // Effects  Update exchange rate
  useEffect(() => {
    setSelectedExchangeRate(webSocketRate.find((rate: ExchangeRate) => rate.symbol === selectedExchangeSymbol).value)

  }, [selectedExchangeSymbol, entryAmount, webSocketRate])

   // Effects  Update exit Amount
  useEffect(() => {
    setexitAmount(Number(entryAmount) * (1 / selectedExchangeRate))

  }, [entryAmount, selectedExchangeRate])
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
        entrySymbol: selectedExchangeSymbol,
        exitSymbol: entrySymbol,
        exchangeRate: 1/selectedExchangeRate,
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
          setErrorMessage(res.message)
        }
      })
      .catch((e) => {
        console.log(e);
        setIsInvalid(true);
      });
  }
  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    // Keep the trade value between 0 and 5000
    const { value, min, max } = e.target;

    let newValue = Math.max(Number(min), Math.min(Number(max), Number
      (value)));

    setEntryAmount(newValue);
  }


  return (
    <StyledForm onSubmit={onSubmitHandler} className="trade-form" role="form">
      <RowContainer>
        <InsideRowContainer>
          <SelectCurrency setSelectedExchange={setSelectedExchangeSymbol}
            selectedExchange={selectedExchangeSymbol}
            exchangeOptions={exchangeOptions} />
          <StyledInput
            type="number"
            placeholder="entry amount"
            name="value"
            onChange={changeHandler}
            value={entryAmount}
            max="500000"

          />
        </InsideRowContainer>

        <InsideRowContainer>
          <StyledLabel>USD</StyledLabel>
          <TradeCalculation exitAmount={exitAmount} isLoading={Number(entryAmount) > 0 && exitAmount <= 0} />
        </InsideRowContainer>

      </RowContainer>

      {isInvalid ? (
        <p className="error">{errorMessage ? errorMessage : "Not able to make trade"}</p>
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
display: flex;
flex-direction: column;
flex: 1;
padding: 0 2rem;
`
const StyledLabel = styled.p`
margin-bottom: 0;
text-align: center;
`
const StyledInput = styled.input`
border: none;
width: 11rem;
margin-top: 0.5rem;
&:active {
  outline:none
}
&:focus {
  outline:none
}
`

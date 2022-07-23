import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useContext, useState } from "react";
import { AuthContext } from "../authentication/AuthContext";
import WebSocketContext from "../socketcontext/WebSocketContext";

export const TradeForm = (props: any) => {
  const token = useContext(AuthContext)?.token;
  const updateUser = useContext(AuthContext)?.updateUser;

  const entrySymbol = props.entrySymbol;
  const exitSymbol = props.exitSymbol;
  const webSocketRate = useContext(WebSocketContext);
  const [isInvalid, setIsInvalid] = useState(false);



  // It's necessary to invert the exchange rate depending if the user wants to exchange JPY -> USD or USD ->JPY
  let exchangeRate: number;
  if (entrySymbol === "JPY") {
    exchangeRate = 1 / webSocketRate;
  }
  if (entrySymbol === "USD") {
    exchangeRate = webSocketRate;
  }

  const entryAmount = props.entryAmount;
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
    <Form onSubmit={onSubmitHandler} className="trade-form" role="form">
      <Form.Group>
        <Form.Label>
          {entrySymbol} to {exitSymbol}
        </Form.Label>
        <Form.Control
          type="number"
          placeholder="entry amount"
          name="value"
          onChange={props.changeHandler}
          value={entryAmount}
          min="0"
          max="500000"
        />
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
      </Form.Group>
    </Form>
  );
};

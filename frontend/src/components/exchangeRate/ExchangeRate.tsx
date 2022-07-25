import { useContext } from "react";
import WebSocketContext from "../../contexts/socketcontext/WebSocketContext";

export const ExchangeRate = () => {
  const exchangeRate = useContext(WebSocketContext);
  if (!(exchangeRate === 0)) {
    return (
      <p>
        1 USD = <span>{exchangeRate.toFixed(3)}</span> JPY
      </p>
    );
  } else {
    return <p>Loading Data...</p>;
  }

};

import { useContext } from "react";
import WebSocketContext  from "./context/WebSocketContext";

export const ExchangeRate = () => {
  const exchangeRate = useContext(WebSocketContext);
  console.log(exchangeRate);
  if (!(exchangeRate === 0)) {
    return (
      <p>
        1 GBP = <span>{exchangeRate}</span> USD
      </p>
    );
  } else {
    return <p>Loading Data...</p>;
  }

};

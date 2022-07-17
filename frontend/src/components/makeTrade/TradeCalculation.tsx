
import { useContext } from "react";
import WebSocketContext from "../socketcontext/WebSocketContext";

export const TradeCalculation = (props: any) => {
  const exchangeRate = useContext(WebSocketContext)
  const exitSymbol = props.exitSymbol;
  const entryAmount = props.entryAmount
  let calculation: number | null = null;

  // The calculation will change depeding if the user wants to trade USD to BTC or BTC to USD. 
  // Show only two decimal digits of the final calculation
  if (exitSymbol === "USD") {
    calculation = Number((entryAmount * exchangeRate).toFixed(2));
  }
  if (exitSymbol === "BTC") {
    calculation = Number((entryAmount / exchangeRate).toFixed(2));
  }


  if (calculation) {
    return (
      <p className="Calculation">
        {calculation} {exitSymbol}
      </p>
    );
  } else {
    return (
      <p className="Calculation" data-testid="calculation">
        0
      </p>
    );
  }

}


import { useContext } from "react";
import WebSocketContext from "../socketcontext/WebSocketContext";

export const TradeCalculation = (props: any) => {
  const exchangeRate = useContext(WebSocketContext)
  const exitSymbol = props.exitSymbol;
  const entryAmount = props.entryAmount
  let calculation = 0;
  // Show only two decimal digits of the final calculation
  // If the final 
  if (exitSymbol === "USD") {
    calculation = Number((entryAmount * exchangeRate).toFixed(2));
  }
  if (exitSymbol === "GBP") {
    calculation = Number((entryAmount / exchangeRate).toFixed(2));
  }
    
  
    if (calculation > 0) {
      return (
        <p className="Calculation">
          {calculation} {exitSymbol}
        </p>
      );
    } else {
      return <p className="Calculation">0</p>;
    }
    
 }
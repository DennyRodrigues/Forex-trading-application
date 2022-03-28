
import { useContext } from "react";
import WebSocketContext from "../socketcontext/WebSocketContext";

export const TradeCalculation = (props: any) => {
  const exchangeRate = useContext(WebSocketContext);
  // Show only two decimail digits of the final calculation
  const calculation = Number((props.entryAmount * exchangeRate).toFixed(2));
  
    if (calculation > 0) {
      return <p className="Calculation">{calculation} USD</p>;
    } else {
      return <p className="Calculation">{calculation}</p>;
    }
    
 }
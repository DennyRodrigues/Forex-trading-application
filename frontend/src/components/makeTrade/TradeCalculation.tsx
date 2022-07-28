
import { useExchangeRates } from "../../contexts/socketcontext/WebSocketProvider";

export const TradeCalculation = (props: any) => {
  const exchangeRate = useExchangeRates();
  const exitSymbol = props.exitSymbol;
  const entryAmount = props.entryAmount
  let calculation = 0;

  // The calculation will change depeding if the user wants to trade JPY to USD or USD to JPY. 
  // Show only two decimal digits of the final calculation
  if (exitSymbol === "JPY") {
    calculation = Number((entryAmount * exchangeRate).toFixed(3));
  }
  if (exitSymbol === "USD") {
    calculation = Number((entryAmount / exchangeRate).toFixed(3));
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

import { TradeCalculation } from "./TradeCalculation";
import { TradeForm } from "./TradeForm"
import { ChangeEvent, useState } from "react";


export const MakeTrade = (props:any) => {

  const [entryAmount, setEntryAmount] = useState(0);
  function changeHandler(e: ChangeEvent<HTMLInputElement>) {


    let { value, min, max } = e.target;

        // Keep the trade value between 0 and 5000
    let newValue = Math.max(Number(min), Math.min(Number(max), Number(value)));

    setEntryAmount(newValue);
  }

  return (
    <div className="tradeContainer">
      <TradeForm
        changeHandler={changeHandler}
        entryAmount={entryAmount}
        entrySymbol={props.entrySymbol}
        exitSymbol={props.exitSymbol}
      />
      <p>=</p>
      <TradeCalculation
        entryAmount={entryAmount}
        exitSymbol={props.exitSymbol}
      />
    </div>
  );
}
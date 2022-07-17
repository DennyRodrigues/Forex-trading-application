import { TradeCalculation } from "./TradeCalculation";
import { TradeForm } from "./TradeForm"
import { ChangeEvent, useState } from "react";


export const MakeTrade = (props: any) => {

  const [entryAmount, setEntryAmount] = useState(0);
  function changeHandler(e: ChangeEvent<HTMLInputElement>) {
    // Keep the trade value between 0 and 5000
    const { value, min, max } = e.target;

    let newValue = Math.max(Number(min), Math.min(Number(max), Number
      (value)));

    setEntryAmount(newValue);
  }

  return (
    <div className="trade-container">
      <TradeForm
        changeHandler={changeHandler}
        entryAmount={entryAmount}
        entrySymbol={props.entrySymbol}
        exitSymbol={props.exitSymbol}
      />
      <p className="trade-equal">=</p>
      <TradeCalculation
        entryAmount={entryAmount}
        exitSymbol={props.exitSymbol}
      />
    </div>
  );
}

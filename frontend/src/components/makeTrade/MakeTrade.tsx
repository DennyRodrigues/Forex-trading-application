import { TradeCalculation } from "./TradeCalculation";
import { TradeForm } from "./TradeForm"
import { ChangeEvent, useState } from "react";


export const MakeTrade = (props:any) => {

  const [entryAmount, setEntryAmount] = useState(0);
  function changeHandler(e: ChangeEvent<HTMLInputElement>) {

    let newValue = Number(e.target.value);

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

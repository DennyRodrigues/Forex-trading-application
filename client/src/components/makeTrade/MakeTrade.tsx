import { TradeCalculation } from "./TradeCalculation";
import { TradeForm } from "./TradeForm"
import React, { useState } from "react";

export const MakeTrade = (props:any) => {

  const [entryAmount, setEntryAmount] = useState(0);
  function changeHandler(e:any) {
    setEntryAmount(e.target.value);

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
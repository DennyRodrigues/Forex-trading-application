import { TradeCalculation } from "./TradeCalculation";
import { TradeForm } from "./TradeForm"
import React, { useState } from "react";

export const MakeTrade = () => {

  const [entryAmount, setEntryAmount] = useState(0);
  function changeHandler(e:any) {
    setEntryAmount(e.target.value);

  }

  return (
    <div className="tradeContainer">
      <TradeForm
        changeHandler={changeHandler}
        entryAmount={entryAmount}
      />
      <p>=</p>
      <TradeCalculation entryAmount={entryAmount} />
    </div>
  );
}
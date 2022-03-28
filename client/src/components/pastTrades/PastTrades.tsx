import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../authentication/AuthContext";


export const PastTrades = () => {
  let token = useContext(AuthContext)?.token;
  console.log(token)

  const [trades, setTrades] = useState<[] | null>(null);

  useEffect(() => {
    fetch(`http://localhost:4100/api/v1/trades`, {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res: any) => res.json() )
      .then((res) => {
        console.log(res)
        setTrades(res.result.trades)
      })
      .catch((e) => console.log(e));

  }, [token])
  console.log(trades);

  if (trades) {
    if (trades?.length > 0) {
      return (
        <div className="past-trades-container">
          {trades.map((trade:any, index) => {
            return (
              <div key={index} className="past-trade mb-3">
                <ul className="list-group">
                  <li className="list-group-item">Date: {trade.date}</li>
                  <li className="list-group-item">
                    Symbol: {trade.exchangeSymbol}
                  </li>
                  <li className="list-group-item">
                    Exchange Rate: {trade.exchangeRate}
                  </li>
                  <li className="list-group-item">
                    Entry Amount: {trade.entryAmount}
                  </li>
                  <li className="list-group-item">
                    Exit Amount: {trade.exchangeAmout.toFixed(2)}
                  </li>
                </ul>
              </div>
            );
          })}
        </div>
      );
      }
    else {
      return (<p>No past trades were found</p>)}
      
  }
  else {
    return <p>Loading past trades...</p>
  }



};
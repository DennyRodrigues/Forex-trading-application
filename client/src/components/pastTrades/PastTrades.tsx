import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../authentication/AuthContext";

export const PastTrades = () => {
  let token = useContext(AuthContext)?.token;

  const [trades, setTrades] = useState<[] | null>(null);

  useEffect(() => {
    fetch(`http://localhost:4100/api/v1/trades`, {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res: any) => res.json())
      .then((res) => {
        setTrades(res.result.trades);
      })
      .catch((e) => console.log(e));
  }, [token]);

  if (trades) {
    if (trades?.length > 0) {
     
      return (
        <div className="past-trades-container">
          {trades.map((trade: any, index) => {
            const date = new Date(trade.date).toLocaleDateString("en-GB", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
            });
             console.log(trade);
            return (
              <div key={index} className="past-trade mb-3">
                <ul className="list-group">
                  <li className="list-group-item">
                    Date: <span>{date}</span>
                  </li>
                  <li className="list-group-item">
                    Rate:
                    <span>{trade.exchangeRate}</span>
                  </li>
                  <li className="list-group-item">
                    Entry Amount:
                    <span>
                      {Number(trade.entryAmount).toFixed(2)}
                      {trade.entrySymbol}
                    </span>
                  </li>
                  <li className="list-group-item">
                    Exchange Received:
                    <span>
                      {Number(trade.exitAmount).toFixed(2)}
                      {trade.exitSymbol}
                    </span>
                  </li>
                </ul>
              </div>
            );
          })}
        </div>
      );
    } else {
      return <p>No past trades were found</p>;
    }
  } else {
    return <p>Loading past trades...</p>;
  }
};

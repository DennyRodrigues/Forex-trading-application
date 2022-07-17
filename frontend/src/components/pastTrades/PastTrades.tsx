import { useEffect, useContext, useState } from "react";
import { Table } from "react-bootstrap";
import { AuthContext } from "../authentication/AuthContext";

export const PastTrades = () => {
  let token = useContext(AuthContext)?.token;

  const [trades, setTrades] = useState<[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true)
    fetch(`http://localhost:${process.env.REACT_APP_API_PORT}/api/v1/trades`, {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res: any) => res.json())
      .then((res) => {
        setTrades(res.result.trades);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e)
        setIsLoading(false);
      });
  }, [token]);

  if (trades) {
    if (trades?.length > 0) {

      return (
        <div className="past-trades-container">
          <h2 className="text-center mb-4">Past Trades</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Num</th>
                <th>Date</th>
                <th>Paid</th>
                <th>Received</th>
                <th>Rate</th>
              </tr>
            </thead>
            <tbody>
              {/* It will receive the trades array, to render the most recents first */}
              {trades
                .slice(0)
                .reverse()
                .map((trade: any, index) => {
                  const date = new Date(trade.date).toLocaleDateString(
                    "en-GB",
                    {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                    }
                  );
                  console.log(trade);
                  return (
                    <tr key={index}>
                      <td>{trades.length - index}</td>
                      <td>{date}</td>
                      <td>
                        {Number(trade.entryAmount).toFixed(2)}
                        {trade.entrySymbol}
                      </td>
                      <td>
                        {Number(trade.exitAmount).toFixed(2)}
                        {trade.exitSymbol}
                      </td>
                      <td>{trade.exchangeRate.toFixed(6)}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
      );
    } else {
      return <p>No past trades were found</p>;
    }
  } else if (isLoading) {
    return <p>Loading past trades...</p>;
  }
  else {
    return <p>ERROR: Unable to connect with server</p>;
  }
};

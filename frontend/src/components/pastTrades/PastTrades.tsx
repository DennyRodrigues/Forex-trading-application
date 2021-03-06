import { useEffect, useContext, useState } from "react";
import { Table } from "react-bootstrap";
import { AuthContext } from "../../contexts/authentication/AuthContext";
import  styled  from "styled-components"

export const PastTrades = () => {
  let token = useContext(AuthContext)?.token;

  const [trades, setTrades] = useState<[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true)
    fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/trades`, {
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
                <StyledTh>Num</StyledTh>
                <StyledTh>Date</StyledTh>
                <StyledTh>Paid</StyledTh>
                <StyledTh>Received</StyledTh>
                <StyledTh>Rate</StyledTh>
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
                  return (
                    <tr key={index}>
                      <StyledTd>{trades.length - index}</StyledTd>
                      <StyledTd>{date}</StyledTd>
                      <StyledTd>
                        {Number(trade.entryAmount).toFixed(2)}
                        {trade.entrySymbol}
                      </StyledTd>
                      <StyledTd>
                        {Number(trade.exitAmount).toFixed(2)}
                        {trade.exitSymbol}
                      </StyledTd>
                      <StyledTd>{trade.exchangeRate.toFixed(6)}</StyledTd>
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

const StyledTh = styled.th`
font-size: 1rem;
@media (min-width: 800px){
  font-size: 1.5rem;
}
@media (min-width: 700px){
  font-size: 1.3rem;
}
`
const StyledTd = styled.td`
  font-size: 1rem;
  @media (min-width: 800px){
  font-size: 1.5rem;
}
@media (min-width: 700px){
  font-size: 1.3rem;
}
`

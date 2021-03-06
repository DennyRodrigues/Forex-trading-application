import { RequireAuth } from "../contexts/authentication/RequireAuth";
import { WebSocketProvider } from "../contexts/socketcontext/WebSocketProvider";
import { ExchangeRatesTable } from "../components/ExchangeRatesTable/ExchangeRatesTable";
import { SellUSDForm } from "../components/makeTrade/SellUSDForm";
import { BuyUSDForm } from "../components/makeTrade/BuyUSDForm";



export const Home = () => {
  return (
    <RequireAuth>
      <WebSocketProvider>
        <div className="container Home">
          <ExchangeRatesTable />
          <div className="trade-container">
            <SellUSDForm entrySymbol="USD" />
           </div>
          <div className="trade-container">
            <BuyUSDForm entrySymbol="USD"/>
          </div>
        </div>
      </WebSocketProvider>
    </RequireAuth>
  );
}

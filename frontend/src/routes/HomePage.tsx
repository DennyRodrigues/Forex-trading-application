import { RequireAuth } from "../contexts/authentication/RequireAuth";
import { WebSocketProvider } from "../contexts/socketcontext/WebSocketProvider";
import { MakeTrade } from "../components/makeTrade/MakeTrade";
import { ExchangeRatesTable } from "../components/ExchangeRatesTable/ExchangeRatesTable";



export const Home = () => {
  return (
    <RequireAuth>
      <WebSocketProvider>
        <div className="container Home">
          <ExchangeRatesTable />
          <MakeTrade entrySymbol="USD" exitSymbol="JPY" />
        </div>
      </WebSocketProvider>
    </RequireAuth>
  );
}

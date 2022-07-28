import { RequireAuth } from "../contexts/authentication/RequireAuth";
import { WebSocketProvider } from "../contexts/socketcontext/WebSocketProvider";
import { MakeTrade } from "../components/makeTrade/MakeTrade";
import { ExchangeTable } from "../components/exchangeTable/ExchangeTable";


export const Home = () => {
  return (
    <RequireAuth>
      <WebSocketProvider>
        <div className="container Home">
          <ExchangeTable/>
          <MakeTrade entrySymbol="USD" exitSymbol="JPY" />
          <MakeTrade entrySymbol="JPY" exitSymbol="USD" />
        </div>
      </WebSocketProvider>
    </RequireAuth>
  );
}

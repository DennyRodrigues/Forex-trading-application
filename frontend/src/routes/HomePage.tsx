import { RequireAuth } from "../contexts/authentication/RequireAuth";
import { ExchangeRate } from "../components/exchangeRate/ExchangeRate";
import { WebSocketProvider } from "../contexts/socketcontext/WebSocketProvider";
import { MakeTrade } from "../components/makeTrade/MakeTrade";


export const Home = () => {
  return (
    <RequireAuth>
      <WebSocketProvider>
        <div className="container Home">
          <ExchangeRate />
          <MakeTrade entrySymbol="USD" exitSymbol="JPY" />
          <MakeTrade entrySymbol="JPY" exitSymbol="USD" />
        </div>
      </WebSocketProvider>
    </RequireAuth>
  );
}

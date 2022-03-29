import { RequireAuth } from "../authentication/RequireAuth";
import { ExchangeRate } from "../exchangeRate/ExchangeRate";
import { WebSocketProvider } from "../socketcontext/WebSocketProvider";
import { MakeTrade } from "../makeTrade/MakeTrade";


export const Home = () => {
  return (
    <RequireAuth>
      <WebSocketProvider>
        <div className="container">
          <ExchangeRate />
          <MakeTrade entrySymbol="GPB" exitSymbol="USD" />
          <MakeTrade entrySymbol="USD" exitSymbol="GPB" />
        </div>
      </WebSocketProvider>
    </RequireAuth>
  );
}
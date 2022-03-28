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
          <MakeTrade />
        </div>
      </WebSocketProvider>
    </RequireAuth>
  );
}
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { ExchangeRate } from "./components/exchangeRate/ExchangeRate";
import { WebSocketProvider } from "./components/context/WebSocketProvider";
import { TradeForm } from "./components/trade/TradeForm";
import { Trade } from "./components/trade/Trade";

function App() {
  return (
    <WebSocketProvider>
      <div className="container">
        <ExchangeRate />
        <Trade/>
      </div>
    </WebSocketProvider>
  );
}

export default App;

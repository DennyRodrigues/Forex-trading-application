import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { ExchangeRate } from "./components/exchangeRate/ExchangeRate";
import { WebSocketProvider } from "./components/context/WebSocketProvider";
import { Trade } from "./components/trade/Trade";
import {UserForm} from "./components/user/UserForm"
 
function App() {
  return (
    <WebSocketProvider>
      <div className="container">
        <UserForm/>
        <ExchangeRate />
        <Trade/>
      </div>
    </WebSocketProvider>
  );
}

export default App;

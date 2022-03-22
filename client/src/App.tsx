import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ExchangeRate } from "./components/ExchangeRate";
import { WebSocketProvider } from "./components/context/WebSocketProvider";

function App() {
  return (
    <WebSocketProvider>
      <div className="container">
        <ExchangeRate />
      </div>
    </WebSocketProvider>
  );
}

export default App;

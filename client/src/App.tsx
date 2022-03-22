import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ExchangeRate } from "./components/context/ExchangeRate";
import { WebSocketProvider } from "./components/context/WebSocketContext";

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

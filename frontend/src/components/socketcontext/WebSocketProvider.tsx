import WebSocketContext from "./WebSocketContext";
import { useState, useEffect } from "react";
import io from "socket.io-client";


// The context will connect to the websocket on backend
export const WebSocketProvider = (props: any) => {
  const socketUrl = "ws://localhost:5002/";
  // Exchange rate that will be passed 
  const [exchangeRate, setExchangeRate] = useState(0);

  useEffect(() => {
    const socket = io(socketUrl)
    socket.on("message", (data) => {
      setExchangeRate(Number(data));
    });
  }, []);

  return (
    <WebSocketContext.Provider value={exchangeRate}>
      {props.children}
    </WebSocketContext.Provider>
  );
};

import WebSocketContext from "./WebSocketContext";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

export const WebSocketProvider = (props: any) => {
  const socketUrl = "http://localhost:5000/";
  const [exchangeRate, setExchangeRate] = useState(0);

  useEffect(() => {
    const socket = io(socketUrl);
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

import WebSocketContext from "./WebSocketContext";
import { useState, useEffect } from "react";
import io from "socket.io-client";


// The context will connect to the websocket on backend
export const WebSocketProvider = (props: any) => {
  const socketUrl = process.env.REACT_APP_SOCKET_URL || '';
  // Exchange rate that will be passed 
  const [exchangeRate, setExchangeRate] = useState(0);

  useEffect(() => {
    const socket = io(socketUrl)
    socket.on("message", (data) => {
      console.info(data);
      setExchangeRate(Number(data));
    });
  }, []);

  return (
    <WebSocketContext.Provider value={exchangeRate}>
      {props.children}
    </WebSocketContext.Provider>
  );
};

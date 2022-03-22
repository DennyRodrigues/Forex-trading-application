import { createContext, useState } from "react";
import useWebSocket from "react-use-websocket";

const WebSocketContext = createContext(0);

export const WebSocketProvider = (props: any) => {
  const socketUrl = "wss://marketdata.tradermade.com/feedadv";
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [exchangeRate, setExchangeRate] = useState(0);
  const { sendMessage, lastMessage, readyState, getWebSocket } = useWebSocket(
    socketUrl,
    {
      onOpen: () => {
        sendMessage(`{"userKey":"${API_KEY}","symbol":"GBPUSD"}`);
      },
      //Will attempt to reconnect on all close events, such as server shutting down
      shouldReconnect: (closeEvent) => true,
      onMessage: (lastMessage) => {
        setExchangeRate(parseData(lastMessage.data));
      },
    }
  );
  return (
    <WebSocketContext.Provider value={exchangeRate}>
      {props.children}
    </WebSocketContext.Provider>
  );
};

function parseData(data: Object) {
  const response = data.toString(); // Shows the original stringified version
  // JSON.parse not working, Get mid value using string split
  let responseArray = response.split(":");
  return Number(responseArray[responseArray.length - 1].slice(0, -1));
}

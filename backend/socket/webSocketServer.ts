import { config } from "dotenv";
import express from "express";
import cors from "cors";
import ws from "ws";
import { createServer } from "http";
import { parseData } from "../helpers/parseExternalDate";


export const startWebScocketServer = () => {
  const port = process.env.PORT_2;

  //Start the backend server socket
  const app = express();
  app.listen(port, () => {
    console.log("Websocket Server is up & running", port);
  });
  const server = createServer(app);
  const backendSocket = new ws.Server({ server });

  backendSocket.on("open", function () {
    console.log("Message from websocket server");
  });

  // Start external API socket
  const tradeSocket = new ws(
    "wss://ws.twelvedata.com/v1/quotes/price?apikey=49b6a79dac694cd0900ab8d8692e367a"
  );

  // Subscribe message to start getting values
  const subscribe = {
    action: "subscribe",
    params: {
      symbols: "BTC/USD",
    },
  };
  // Connection opened
  tradeSocket.addEventListener("open", function (event) {
    tradeSocket.send(JSON.stringify(subscribe));
  });

  // Listen for messages and emit it using the backedSocket
  tradeSocket.addEventListener("message", function (event) {
    backendSocket.emit("message", () => event.data);
    console.log("Message from External websocket ", parseData(event.data));
  });
};

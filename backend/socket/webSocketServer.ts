import { config } from "dotenv";
import express from "express";
import cors from "cors";
import ws from "ws";
import { createServer } from "http";
import { parseData } from "../helpers/parseExternalDate";
import { Server } from "socket.io";

export const startWebScocketServer = () => {
  const port = process.env.PORT_2;

  //Start the backend server socket
  const app = express();
  app.use(cors());
  const server = createServer(app);
  const backendSocket = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  server.listen(port, () => {
    console.log("Websocket Server is up & running", port);
  });

  // Start external API socket
  const connectExternalAPI = () => {
    const tradeSocket = new ws(
      "wss://ws.twelvedata.com/v1/quotes/price?apikey=49b6a79dac694cd0900ab8d8692e367a"
    );

    // Subscribe message to start getting values
    const subscribe = {
      action: "subscribe",
      params: {
        symbols: "USD/JPY",
      },
    };
    // Connection opened
    tradeSocket.on("open", (event) => {
      tradeSocket.send(JSON.stringify(subscribe));
    });
    3001;

    // Listen for messages and emit it using the backedSocket
    tradeSocket.on("message", (data) => {
      backendSocket.emit("message", parseData(data));
    });
  };
  connectExternalAPI();
};

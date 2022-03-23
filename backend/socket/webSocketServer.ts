const express = require("express");
const app = express();
const cors = require("cors");
const ws = require("ws");
app.use(cors());
import {parseData} from "../helpers/parseExternalDate"


const startWebScocketServer = () => {
  // MY WEBSOCKET SERVER
  const port = process.env.PORT_2;
  const server = app.listen(port, () => {
  console.log("Websocket server is up & running", port);
});

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});


io.on("connection", (socket:any) => {
  console.log("Connected & Socket Id is ", socket.id);
});

// Connect external API
  const reconnectInterval = 1000 * 10;
  const API_KEY = process.env.API_KEY;
  const connectExternalAPI = () => {
  const externalAPI = new ws("wss://marketdata.tradermade.com/feedadv");

  externalAPI.on("open", function open() {
    externalAPI.send(`{"userKey":"${API_KEY}", "symbol":"GBPUSD"}`);
  });

  externalAPI.on("close", function () {
    console.log("socket close : will reconnect in " + reconnectInterval);
    setTimeout(connectExternalAPI, reconnectInterval);
  });

  externalAPI.on("message", function incoming(data: any) {
    const mid = parseData(data);
    if (!isNaN(mid)){
      io.emit("message", mid.toString());
    }
  });
  }
  connectExternalAPI();
}

export = startWebScocketServer;
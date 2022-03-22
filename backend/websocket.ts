const ws = require("ws");

const reconnectInterval = 1000 * 10;
const API_KEY = process.env.API_KEY;

const connect = function () {
  return new Promise(function (resolve) {
    const webSocket = new ws("wss://marketdata.tradermade.com/feedadv");
    webSocket.on("open", function open() {
      webSocket.send(`{"userKey":"${API_KEY}","symbol":"GBPUSD"}`);
    });
    webSocket.on("close", function () {
      console.log("socket close : will reconnect in " + reconnectInterval);
      setTimeout(connect, reconnectInterval);
    });

    webSocket.on("message", function incoming(data:any) {
      let mid = parseData(data);
      if (!isNaN(mid)) {
        resolve({
          mid: mid,
        });
        webSocket.close()
      }
    });
  });
};

function parseData(data:Object) {
  const response = data.toString(); // Shows the original stringified version
  // JSON.parse not working, Get mid value using string split
  let responseArray = response.split(":");
  return Number(responseArray[responseArray.length - 1].slice(0, -1));
}

connect();

module.exports = connect;

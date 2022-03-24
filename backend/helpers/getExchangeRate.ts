import { io } from "socket.io-client";

const port = process.env.PORT_2;
const socketUrl = `http://localhost:${port}/`;

async function getExchangeRate(){
  return new Promise((resolve) => {
    const socket = io(socketUrl);
    socket.on("message", (data) => {
      resolve(
        {
          rate: Number(data),
          date: new Date().toISOString(),
        });
    });
  });
};

export = getExchangeRate;
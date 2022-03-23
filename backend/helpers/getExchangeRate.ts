import { io } from "socket.io-client";


const socketUrl = "http://localhost:5000/";

const getExchangeRate = () => {
  return (new Promise((resolve) => {
    const socket = io(socketUrl);
    socket.on("message", (data) => {
      resolve(Number(data))
    });
  }))
}

export = getExchangeRate;
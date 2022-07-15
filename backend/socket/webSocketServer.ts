import express from "express";
import cors from "cors";
import ws from "ws";
import {parseData} from "../helpers/parseExternalDate"
import ForgeClient from 'forex-quotes';

export const startWebScocketServer = () => { 
const socket = new ws("wss://ws.twelvedata.com/v1/quotes/price?apikey=49b6a79dac694cd0900ab8d8692e367a");

const subscribe = {
  "action": "subscribe",
  "params": {
	"symbols": "AAPL,INFY,TRP,QQQ,IXIC,EUR/USD,USD/JPY,BTC/USD,ETH/BTC"
  }
}
// Connection opened
socket.addEventListener('open', function (event) {
    socket.send(JSON.stringify(subscribe));
});

// Listen for messages
socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
});

}

import ws from 'ws'
import { parseData } from '../helpers/parseExternalDate'
import { Server } from 'socket.io'
import type { Server as ServerHttp } from 'http'

/**
 * Setup a websocket on an already existed httpServer
 * @param server
 */

export function setupWebSocketServer(server: ServerHttp) {
  //Start the backend server socket
  const wsServer = new Server(server, {
    cors: {
      origin: '*',
    },
  })
  console.log('wsServer server:', wsServer)
  try {
    // Start external API socket
    const connectExternalAPI = () => {
      const tradeSocket = new ws(
        `wss://ws.twelvedata.com/v1/quotes/price?apikey=${process.env.API_KEY}`
      )
      // Subscribe message to start getting values
      const subscribe = {
        action: 'subscribe',
        params: {
          symbols: 'EUR/USD,USD/JPY,BTC/USD',
        },
      }
      // Connection opened
      tradeSocket.on('open', () => {
        tradeSocket.send(JSON.stringify(subscribe))
      })

      // Listen for messages and emit it using the backedSocket
      tradeSocket.on('message', (data: any) => {
        const parsedData = parseData(data)
        console.log(parsedData)
        wsServer.emit('message', parsedData)
      })
    }
    connectExternalAPI()
  } catch (error) {
    console.error(error)
  }
}

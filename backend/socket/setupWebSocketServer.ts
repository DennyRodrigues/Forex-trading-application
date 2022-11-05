import { config } from 'dotenv'
import ws from 'ws'
import { parseData } from '../helpers/parseExternalDate'
import type { Server } from 'http'
import { Server as CreateServer } from 'socket.io'
config()

export async function setupWebSocketServer(server: Server) {
  const PORT = process.env.WEBSOCKET_PORT || 5001

  //Start the backend server socket
  const backendSocket = new CreateServer(server, {
    cors: {
      origin: '*',
    },
  })
  const callback = () => {
    console.log('Websocket Server is up & running on port ', PORT)
  }

  server.listen(PORT, callback)

  server.on('error', (e: NodeJS.ErrnoException) => {
    if (e.code === 'EADDRINUSE') {
      console.log('Address in use, retrying...')
      server.close()
      throw e
    }
  })
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
      backendSocket.emit('message', parseData(data))
    })
  }
  connectExternalAPI()
}

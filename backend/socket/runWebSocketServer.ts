import { setupWebSocketServer } from './setupWebSocketServer'
import { createServer } from 'http'

const server = createServer()

export async function runWebSocketServer() {
  try {
    await setupWebSocketServer(server)
  } catch (e) {
    console.error(e)
    throw e
  }
}

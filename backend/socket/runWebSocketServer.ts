import express from 'express'
import cors from 'cors'
import { setupWebSocketServer } from './setupWebSocketServer'
import { createServer } from 'http'

const app = express()
app.use(cors())
const server = createServer(app)

export async function runWebSocketServer() {
  try {
    await setupWebSocketServer(server)
  } catch (e) {
    console.error(e)
    throw e
  }
}

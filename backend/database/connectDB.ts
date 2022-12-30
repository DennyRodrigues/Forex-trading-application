import mongoose from 'mongoose'

const MONGO_URL = process.env.MONGO_URL
export async function connectDB() {
  if (!MONGO_URL) {
    throw new Error('MONGO_URL enviroment variable must be set')
  }
  try {
    await mongoose.connect(MONGO_URL)
    console.log('mongoDB connected successfully.')
  } catch (error) {
    throw error
  }
}

import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT

const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

const NODE_ENV = process.env.NODE_ENV

export {
  PORT,
  MONGODB_URI,
  NODE_ENV
}
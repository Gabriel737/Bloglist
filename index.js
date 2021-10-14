import app from './app.js'
import logger from './utils/logger.js'
import { PORT } from './utils/config.js'
import http from 'http'

const server = http.createServer(app)

server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})
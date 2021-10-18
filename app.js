import express, { json } from 'express'
import cors from 'cors'
import Blog from './models/blog.js'
import blogsRouter from './controllers/blogs.js'
import usersRouter from './controllers/users.js'
import { errorHandler, unknownEndpoint } from './utils/middleware.js'
import 'express-async-errors'

const app = express()

app.use(cors())
app.use(json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

app.get('/', async (request, response) => {
  const count = await Blog.count({})
  response.writeHead(200, { 'Content-Type' : 'text/html' })
    .end(
      `<p>Blog presently has  ${count} entries</p> ${String(Date())}`
    )
})

app.use(errorHandler)
app.use(unknownEndpoint)

export default app
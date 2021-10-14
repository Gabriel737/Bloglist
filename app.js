import express, { json } from 'express'
import cors from 'cors'
import Blog from './models/blog.js'
import 'express-async-errors'

const app = express()

app.use(cors())
app.use(json())

app.get('/', async (request, response) => {
  const count = await Blog.count({})
  response.writeHead(200, { 'Content-Type' : 'text/html' })
    .end(
      `<p>Blog presently has  ${count} entries</p> ${String(Date())}`
    )
})

app.get('/api/blogs', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

app.post('/api/blogs', async (request, response) => {
  const blog = new Blog(request.body)
  const result = await blog.save()
  response.status(201).json(result)
})

export default app
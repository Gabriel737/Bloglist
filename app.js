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

app.put('/api/blogs/:id', async (request, response) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(201).json(updatedBlog)
})

app.delete('/api/blogs/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

export default app
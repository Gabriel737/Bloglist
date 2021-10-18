import supertest from 'supertest'
import mongoose from 'mongoose'
import 'regenerator-runtime/runtime'
import helper from './test_helper.js'
import Blog from '../models/blog.js'
import app from '../app.js'

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('General Tests', () => {

  test('All blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('Blogs are returned as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('Blogs have ID property', async () => {
    const response = await api.get('/api/blogs')
    for(let blog of response.body) {
      expect(blog.id).toBeDefined()
    }
  })
})

describe('Addition of a blog', () => {

  test('Added blog gets added to DB', async () => {
    const oldBlogs = await helper.getBlogs()
    const newBlog = {
      'title': 'Test',
      'author': 'Test',
      'url': 'Test',
      'likes': 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.getBlogs()
    expect(blogsAtEnd).toHaveLength(oldBlogs.length + 1)
  })

  test('Added blog without like value gets defaulted to 0', async () => {
    const newBlog = {
      'title': 'Test',
      'author': 'Test',
      'url': 'Test',
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)
  })

  test('Added blog without title gets rejected', async () => {
    const newBlog = {
      'author': 'Test',
      'url': 'Test',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('Added blog without url gets rejected', async () => {
    const newBlog = {
      'title': 'Test',
      'author': 'Test',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
})

describe('Updating of a blog', () => {

  test('Updating of first blog updates it in DB', async () => {
    const oldBlogs = await helper.getBlogs()
    let oldBlog = oldBlogs[0]
    const updatedBlog = {
      title: oldBlog.title,
      author: oldBlog.author,
      url: oldBlog.url,
      likes: oldBlog.likes + 1
    }

    await api
      .put(`/api/blogs/${oldBlog.id}`)
      .send(updatedBlog)
      .expect(201)

    const result = await Blog.findById(oldBlog.id)
    expect(result.likes).toBe(oldBlog.likes + 1)
  })
})

describe('Deletion of a blog', () => {
  test('Deletion of first blog removes it from DB', async () => {
    const oldBlogs = await helper.getBlogs()

    await api
      .delete(`/api/blogs/${oldBlogs[0].id}`)
      .expect(204)

    const newBlogs = await helper.getBlogs()

    expect(newBlogs).toHaveLength(oldBlogs.length - 1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
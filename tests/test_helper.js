import Blog from '../models/blog.js'

const initialBlogs = [
  {
    'title': 'Test1',
    'author': 'Test',
    'url': 'Test',
    'likes': 1
  },
  {
    'title': 'Test2',
    'author': 'Test',
    'url': 'Test',
    'likes': 2
  }
]

const getBlogs = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

export default {
  initialBlogs,
  getBlogs
}
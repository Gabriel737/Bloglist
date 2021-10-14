import { MONGODB_URI } from '../utils/config.js'
import mongoose from 'mongoose'

mongoose.connect(MONGODB_URI)
  .then( () => {
    console.log('Connected to MongoDB')
  }).catch((error) => {
    console.log('Error: ', error.message)
  })

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)
export default Blog
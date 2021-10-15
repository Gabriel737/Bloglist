import { MONGODB_URI } from '../utils/config.js'
import mongoose from 'mongoose'

mongoose.connect(MONGODB_URI)
  .then( () => {
    console.log('Connected to MongoDB')
  }).catch((error) => {
    console.log('Error: ', error.message)
  })

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  url: { type: String, required: true },
  likes: { type: Number, default: 0 }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Blog = mongoose.model('Blog', blogSchema)
export default Blog
import mongoose from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  name: String,
  password: String,
  posts : [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'post'
    }
  ]
})


userSchema.plugin(mongooseUniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

export default User
import mongoose, { Schema } from 'mongoose'
import { boolean } from '@hapi/joi'
const userSchema = new Schema({
  email: {
    type: String
  },
  password: String,
  gender: String,
  avatarURL: {
    type: String,
    default: ''
  },
  subscription: {
    type: String,
    enum: ['free', 'pro', 'premium'],
    default: 'free'
  },
  token: {
    type: String,
    default: ''
  },
  verificationToken: {
    type: String,
    default: ''
  },
  isVerification: {
    type: Boolean,
    default: false
  }
})

class User {
  constructor () {
    this.user = mongoose.model('User', userSchema)
  }
  createUser = user => this.user.create(user)

  findUser = query => this.user.findOne(query)

  updateUser = (user, update) => {
    return this.user.updateOne({ email: user.email }, { $set: update })
  }
}

export default new User()

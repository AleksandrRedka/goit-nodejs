import mongoose, { Schema } from 'mongoose'
const userSchema = new Schema({
  email: {
    type: String
  },
  password: String,
  subscription: {
    type: String,
    enum: ['free', 'pro', 'premium'],
    default: 'free'
  },
  token: String
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

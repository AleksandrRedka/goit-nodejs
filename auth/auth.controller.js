import bcrypt from 'bcrypt'
import config from 'config'
import User from '../users/users.model'
import { createToken } from '../services/auth.service'

export const registrationController = async (req, res) => {
  const salt = config.get('SALT')
  try {
    const hashPassword = await bcrypt.hash(req.body.password, salt)
    const user = { ...req.body, password: hashPassword }
    const newUser = await User.createUser(user)
    const { email, subscription, ...data } = newUser
    res.status(201).json({ user: { email, subscription } })
  } catch (err) {
    res.status(400).send(err.message || 'Server error')
  }
}

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findUser({ email })
    if (!user) {
      res.status(401).send('Not authorized')
    }

    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      res.status('Data is wrong')
    }

    const token = await createToken({ id: user._id })

    await User.updateUserToken(user, token)

    res.json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription
      }
    })
  } catch (error) {
    console.log(error)
    res.status(400).send('Server error')
  }
}

export const logoutController = async (req, res) => {
  console.log('USER', req.user)
  try {
    await User.updateUser(req.user, { token: '' })
    res.status(204)
  } catch (error) {
    res.status(400).send('Server error!')
  }
}

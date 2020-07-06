import bcrypt from 'bcrypt'
import config from 'config'
import User from '../users/users.model'
import { createToken } from '../services/auth.service'
import { generateAvatar } from '../services/avatarGenerator.services'
import { sendVerificationToken } from '../services/mailSendler.servece'

export const registrationController = async (req, res) => {
  const salt = config.get('SALT')
  try {
    const hashPassword = await bcrypt.hash(req.body.password, salt)
    const imageInfo = await generateAvatar(req.body.email, req.body.gender)
    const user = {
      ...req.body,
      password: hashPassword,
      avatarURL: imageInfo.imagePath,
      gender: imageInfo.gender
    }

    const newUser = await User.createUser(user)
    const { _id, email, subscription, avatarURL } = newUser

    await sendVerificationToken(_id, email)

    res.status(201).json({ user: { email, subscription, avatarURL } })
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

    await User.updateUser(user, { token })

    res.json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription
      }
    })
  } catch (err) {
    console.log(err)
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

export const verifyEmailController = async (req, res) => {
  const verifyToken = req.params.token

  const findedUserByToken = await User.findUser({
    verificationToken: verifyToken
  })

  if (!verifyToken) {
    res.status(401).send('No token provider!')
  } else if (!findedUserByToken) {
    res.redirect('http://localhost:3000/404.html')
  } else {
    await User.updateUser(findedUserByToken, {
      verificationToken: '',
      isVerification: true
    })
    res.redirect('http://localhost:3000/confirm-success.html')
  }
}

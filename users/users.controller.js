import User from '../users/users.model'
import { deleteDefaultAvatar } from '../helpers/deleteDefaultAvatar.helper'

export const getCurrentUserController = (req, res) => {
  try {
    const { email, subscription } = req.user
    res.status(200).json({ email, subscription })
  } catch (error) {
    res.status(401).send({ message: 'Not authorized' })
  }
}

export const updateSubscriptionUser = async (req, res) => {
  try {
    const { subscription } = req.body
    await User.updateUser(req.user, { subscription })
    res.status(201).send('Subscription changed')
  } catch (error) {
    res.status(401).send(error.message || 'Server eror')
  }
}

export const uploaвAvatarController = async (req, res) => {
  try {
    if (req.file.path) {
      const path = `http://localhost:3000/${req.file.path}`
      console.log(path)
      await User.updateUser(req.user, { avatarURL: path })
      await deleteDefaultAvatar(req.user.email)
      res.status(200).json({ avatarURL: path })
    } else {
      throw new Error({ message: 'File not found' })
    }
  } catch (err) {
    res.status(401).send(err.message || 'Server eror')
  }
}

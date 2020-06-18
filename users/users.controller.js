import User from '../users/users.model'

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

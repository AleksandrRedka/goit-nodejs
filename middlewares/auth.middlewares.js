import jwt from 'jsonwebtoken'
import User from '../users/users.model'

export const tokenMiddleware = async (req, res, next) => {
  const { authorization: token } = req.headers
  if (!token) {
    res.status(401).send({ message: 'Not authorized' })
  }
  try {
    const { id } = await jwt.verify(token, process.env.PRIVATE_KEY)
    const user = await User.findUser({ _id: id })
    if (!user) {
      res.status(400).send({ message: 'Not authorized' })
    } else {
      req.user = user
      next()
    }
  } catch (error) {
    res.status(401).send({ message: 'Not authorized' })
  }
}

import Joi from '@hapi/joi'
import User from '../users/users.model'

const userValidSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  name: Joi.string(),
  gender: Joi.string()
})

export const userValidationMiddleware = (req, res, next) => {
  const { error } = userValidSchema.validate(req.body)
  if (error) {
    res.status(400).send(error.message)
  }
  next()
}

export const uniqueEmailValidationMiddleware = async (req, res, next) => {
  const { email } = req.body
  const uniqueEmail = await User.findUser({ email })
  if (uniqueEmail) {
    res.status(409).send('Email in use')
  }
  next()
}

export const validSubscription = (req, res, next) => {
  const listSubscription = ['free', 'pro', 'premium']

  const { subscription } = req.body
  if (!listSubscription.includes(subscription)) {
    res.status(401).send('Subscription not valid')
  } else {
    next()
  }
}

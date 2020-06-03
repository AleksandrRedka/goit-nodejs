import Joi from '@hapi/joi'

const contactValidator = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  subscription: Joi.string(),
  password: Joi.string().required(),
  token: Joi.string()
})

export const contactValidateMiddleware = (req, res, next) => {
  const { error } = contactValidator.validate(req.body)
  if (error) {
    res.status(400).send({ message: 'Missing required name field' })
    return
  }
  next()
}

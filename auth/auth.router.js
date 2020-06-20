import { Router } from 'express'
import {
  registrationController,
  loginController,
  logoutController
} from './auth.controller'
import {
  userValidationMiddleware,
  uniqueEmailValidationMiddleware
} from '../users/users.validation'
import { tokenMiddleware } from '../middlewares/auth.middlewares'

const authRouter = Router()

authRouter.post(
  '/register',
  userValidationMiddleware,
  uniqueEmailValidationMiddleware,
  registrationController
)
authRouter.post('/login', userValidationMiddleware, loginController)
authRouter.post('/logout', tokenMiddleware, logoutController)

export default authRouter

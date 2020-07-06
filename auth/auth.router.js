import { Router } from 'express'
import {
  registrationController,
  loginController,
  logoutController,
  verifyEmailController
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
authRouter.get('/verify/:token', verifyEmailController)

export default authRouter

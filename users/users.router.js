import { Router } from 'express'
import { tokenMiddleware } from '../middlewares/auth.middlewares'
import {
  getCurrentUserController,
  updateSubscriptionUser
} from './users.controller'
import { validSubscription } from './users.validation'

const usersRouter = Router()

usersRouter.get('/current', tokenMiddleware, getCurrentUserController)
usersRouter.patch(
  '/',
  tokenMiddleware,
  validSubscription,
  updateSubscriptionUser
)

export default usersRouter

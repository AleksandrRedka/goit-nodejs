import { Router } from 'express'
import { tokenMiddleware } from '../middlewares/auth.middlewares'
import {
  getCurrentUserController,
  updateSubscriptionUser,
  uploaвAvatarController
} from './users.controller'
import { validSubscription } from './users.validation'
import { avatarUploader } from '../middlewares/uploadAvatar.middleware'

const usersRouter = Router()

usersRouter.get('/current', tokenMiddleware, getCurrentUserController)
usersRouter.patch(
  '/',
  tokenMiddleware,
  validSubscription,
  updateSubscriptionUser
)
usersRouter.patch(
  '/avatar',
  tokenMiddleware,
  avatarUploader().single('avatar'),
  uploaвAvatarController
)

export default usersRouter

import { Router } from 'express'
import {
  getContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController
} from './contacts.controller'
import { contactValidateMiddleware } from './contacts.validator'
import { tokenMiddleware } from '../middlewares/auth.middlewares'

const contactsRouter = Router()

contactsRouter.get('/', tokenMiddleware, getContactsController)
contactsRouter.get('/:id', tokenMiddleware, getContactByIdController)

contactsRouter.post(
  '/',
  tokenMiddleware,
  contactValidateMiddleware,
  addContactController
)

contactsRouter.delete('/:id', tokenMiddleware, removeContactController)

contactsRouter.patch(
  '/:id',
  tokenMiddleware,
  contactValidateMiddleware,
  updateContactController
)

export default contactsRouter

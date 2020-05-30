import { Router } from 'express'
import {
  getContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController
} from './contacts.controller'
import { contactValidateMiddleware } from './contacts.validator'

const contactsRouter = Router()

contactsRouter.get('/', getContactsController)
contactsRouter.get('/:id', getContactByIdController)

contactsRouter.post('/', contactValidateMiddleware, addContactController)

contactsRouter.delete('/:id', removeContactController)

contactsRouter.patch('/:id', contactValidateMiddleware, updateContactController)

export default contactsRouter

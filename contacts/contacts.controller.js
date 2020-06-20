import Contacts from './contacts.model'
import { array } from '@hapi/joi'

export const getContactsController = async (req, res) => {
  try {
    const { page, limit, sub } = req.query
    const contacts = await Contacts.getContacts(
      sub ? { subscription: sub } : {}
    )
    if (contacts) {
      if (page && limit) {
        const options = {
          page: page,
          limit: limit
        }
        const paginated = await Contacts.contact.paginate({}, options)
        const responseGetContacts = fiteredResponseContacts(paginated.docs)
        res.status(200).json(responseGetContacts)
      } else {
        res.status(200).json(contacts)
      }
    } else {
      res.status(404).send('Contacts not found!')
    }
  } catch (err) {
    res.status(400).send('Server error')
  }
}

export const getContactByIdController = async (req, res) => {
  try {
    const contact = await Contacts.getById(req.params.id)
    if (contact) {
      res.status(200).json(contact)
    } else {
      es.status(404).send(`Contact with id ${req.params.id} not found`)
    }
  } catch (err) {
    res.status(404).send(err.message || 'Not found')
  }
}

export const addContactController = async (req, res) => {
  try {
    const newContact = await Contacts.addContact(req.body)
    res.status(201).json(newContact)
  } catch (err) {
    res.status(500).send('Server error')
  }
}

export const removeContactController = async (req, res) => {
  try {
    console.log(req.params.id)
    const result = await Contacts.removeContact(req.params.id)
    if (result) {
      res.status(201).send('Contact deleted')
    } else {
      throw new Error()
    }
  } catch (err) {
    res.status(404).send('Not found')
  }
}

export const updateContactController = async (req, res) => {
  try {
    const newContact = await Contacts.updateContact({
      id: req.params.id,
      ...req.body
    })
    res.status(200).json(newContact)
  } catch (err) {
    res.status(404).send('Not found')
  }
}

const fiteredResponseContacts = array =>
  array.map(item => ({
    id: item._id,
    email: item.email,
    subscription: item.subscription
  }))

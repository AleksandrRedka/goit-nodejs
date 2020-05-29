import Contacts from './contacts.model'
import contacts from '../db/contacts.json'

export const getContactsController = async (req, res) => {
  try {
    const contacts = await Contacts.getContacts()
    if (contacts) {
      res.status(200).json(contacts)
    } else {
      throw new Error('Contacts not found!')
    }
  } catch (err) {
    res.status(404).send(err.message || 'Server error')
  }
}

export const getContactByIdController = async (req, res) => {
  try {
    const contact = await Contacts.getById(req.params.id)
    console.log(contact)
    if (contact) {
      res.status(200).json(contact)
    } else {
      throw new Error(`Contact with id ${req.params.id} not found`)
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

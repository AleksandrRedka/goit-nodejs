import { v4 as uuid } from 'uuid'
import fs from 'fs'
import path from 'path'
import { throws } from 'assert'

const fsPromises = fs.promises
const contactsPath = path.join(__dirname, '../', 'db/', 'contacts.json')

class Contact {
  getContacts = async () => {
    try {
      const contacts = await listContacts()
      return contacts
    } catch (err) {
      return null
    }
  }

  getById = async contactId => {
    try {
      const contacts = await listContacts()
      const findedContact =
        contacts.find(contact => contact.id == contactId) || null
      return findedContact
    } catch (err) {
      return null
    }
  }

  addContact = async contact => {
    try {
      const contacts = await listContacts()
      const newContact = {
        id: uuid(),
        name: contact.name,
        email: contact.email,
        phone: contact.email
      }
      contacts.push(newContact)

      fsPromises.writeFile(contactsPath, JSON.stringify(contacts))
      return newContact
    } catch (err) {
      return null
    }
  }
  removeContact = async contactId => {
    try {
      const contacts = await listContacts()
      const newListContact = contacts.filter(
        contact => contact.id !== contactId
      )
      fsPromises.writeFile(contactsPath, JSON.stringify(newListContact))
      return true
    } catch (err) {
      return null
    }
  }

  updateContact = async contact => {
    try {
      const contacts = await listContacts()
      const contactIndex = contacts.findIndex(c => c.id == contact.id)
      if (contactIndex > -1) {
        contacts.splice(contactIndex, 1)
        contacts.push(contact)
        fsPromises.writeFile(contactsPath, JSON.stringify(contacts))
        return contact
      } else {
        throw new Error()
      }
    } catch (err) {
      return null
    }
  }
}

const listContacts = async () => {
  const result = await fsPromises.readFile(contactsPath, 'utf-8')
  const contactsList = JSON.parse(result)
  return contactsList
}

export default new Contact()

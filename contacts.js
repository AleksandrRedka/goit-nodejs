const fs = require('fs')
const path = require('path')
const shortid = require('shortid')

const generateId = shortid.generate()

const fsPromises = fs.promises

const contactsPath = path.join(__dirname, 'db/', 'contacts.json')

async function listContacts () {
  const data = await fsPromises.readFile(contactsPath, 'utf-8').catch(err => {
    throw err
  })
  const contacts = JSON.parse(data)
  console.table(contacts)
  return contacts
}

async function getContactById (contactId) {
  const data = await fsPromises.readFile(contactsPath, 'utf-8').catch(err => {
    throw err
  })
  const contacts = JSON.parse(data)
  const findedContact =
    contacts.find(item => item.id === contactId) || 'Contact not found'
  console.log(findedContact)
  return findedContact
}

async function removeContact (contactId) {
  const data = await fsPromises.readFile(contactsPath, 'utf-8')
  const contacts = JSON.parse(await data)
  const newListContact = contacts.filter(contact => contact.id !== contactId)
  const saveFile = await fsPromises.writeFile(
    contactsPath,
    JSON.stringify(newListContact)
  )
  listContacts()
}

async function addContact (name, email, phone) {
  const data = await fsPromises.readFile(contactsPath, 'utf-8')
  const contacts = JSON.parse(await data)
  const newContact = {
    id: generateId,
    name,
    email,
    phone
  }
  contacts.push(newContact)

  const saveFile = await fsPromises.writeFile(
    contactsPath,
    JSON.stringify(contacts)
  )
  console.log('Contacts save')
  listContacts()
}

exports.listContacts = listContacts
exports.getContactById = getContactById
exports.removeContact = removeContact
exports.addContact = addContact

// // exports.contacts = {
// listContacts, exgetContactById, removeContact, addContact
// // }

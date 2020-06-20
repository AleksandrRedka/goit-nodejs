import mongoose, { Schema } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const contactSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  subscription: String,
  password: String,
  token: String
})

contactSchema.plugin(mongoosePaginate)

class Contact {
  constructor () {
    this.contact = mongoose.model('contacts', contactSchema)
  }

  getContacts = async query => {
    try {
      const contacts = await this.contact.find(query)
      return contacts
    } catch (err) {
      return null
    }
  }

  getById = async contactId => {
    try {
      return await this.contact.findById(contactId)
    } catch (err) {
      return null
    }
  }

  addContact = async contact => {
    try {
      const newContact = {
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        subscription: contact.subscription || '',
        password: contact.password,
        token: contact.token || ''
      }
      await this.contact.create(newContact)
      return newContact
    } catch (err) {
      return null
    }
  }
  removeContact = async contactId => {
    try {
      await this.contact.deleteOne({ _id: contactId })
      return true
    } catch (err) {
      return null
    }
  }

  updateContact = async contact => {
    try {
      const { id, ...contactData } = contact
      await this.contact.updateOne({ _id: id }, contactData)
      return await this.getById(id)
    } catch (err) {
      return null
    }
  }

  getFilteredContacts = async filter => {}
}

export default new Contact()

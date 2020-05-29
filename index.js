require = require('esm')(module)

import express from 'express'
import config from 'config'
import cors from 'cors'
import contactsRouter from './contacts/contacts.router'

const PORT = config.get('PORT') || 3000
const corsOpt = {
  origin: 'http://localhost:3000/'
}

const app = express()
app.use(cors(corsOpt))
app.use(express.json())
app.use('/contacts', contactsRouter)

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT} port`)
})

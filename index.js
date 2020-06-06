require = require('esm')(module)

import express from 'express'
import config from 'config'
import cors from 'cors'
import contactsRouter from './contacts/contacts.router'
import mongoose from 'mongoose'

const PORT = config.get('PORT') || 3000

const corsOpt = {
  origin: 'http://localhost:3000/'
}

const start = async () => {
  const app = express()
  app.use(cors(corsOpt))

  try {
    await mongoose.connect(config.get('DB_URL'), { useUnifiedTopology: true })

    console.log('Database connection successful')

    app.use(express.json())

    app.use('/contacts', contactsRouter)

    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT} port`)
    })
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

start()

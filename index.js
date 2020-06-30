require = require('esm')(module)

import dotenv from 'dotenv'
dotenv.config()
import config from 'config'
import express from 'express'
import cors from 'cors'
import contactsRouter from './contacts/contacts.router'
import mongoose from 'mongoose'
import authRouter from './auth/auth.router'
import usersRouter from './users/users.router'

const PORT = config.get('PORT') || 3000

const corsOpt = {
  origin: `http://localhost:${PORT}/`
}

const start = async () => {
  const app = express()
  app.use(cors(corsOpt))

  try {
    await mongoose.connect(config.get('DB_URL'), { useUnifiedTopology: true })

    console.log('Database connection successful')

    app.use(express.json())

    app.use('/contacts', contactsRouter)

    app.use('/auth', authRouter)

    app.use('/users', usersRouter)

    app.use('/default-image/', express.static('tmp'))

    app.use('/public/images', express.static('public/images'))

    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT} port`)
    })
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

start()

import jwt from 'jsonwebtoken'

export const createToken = userData => {
  return jwt.sign(
    userData,
    process.env.PRIVATE_KEY,
    { algorithm: 'HS256' },
    { expiresIn: '10000h' }
  )
}

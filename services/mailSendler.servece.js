import sendgridMail from '@sendgrid/mail'

import jwt from 'jsonwebtoken'
import User from '../users/users.model'

export const sendVerificationToken = async (id, email) => {
  sendgridMail.setApiKey(process.env.SENDGRID_API_KEY)
  const token = await jwt.sign(
    { id },
    process.env.PRIVATE_KEY_VERIFICATION_MAIL,
    {
      expiresIn: '1w'
    }
  )
  await User.updateUser({ email }, { verificationToken: token })
  const messageVerificationTemlpate = {
    to: email,
    from: 'alex24.redka@gmail.com',
    subject: 'Confirm verification email',
    text: 'Please, verification your email!',
    html: `<a href="http://localhost:3000/auth/verify/${token}">Confirm my account</a>`
  }
  return await sendgridMail.send(messageVerificationTemlpate)
}

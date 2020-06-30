import fs from 'fs'
import path from 'path'

export const deleteDefaultAvatar = async email => {
  const nameFile = email.split('@')[0]
  const pathToDafaultAvatar = path.join(
    __dirname,
    '../',
    'tmp/',
    `${nameFile}.png`
  )
  try {
    return await fs.promises.unlink(pathToDafaultAvatar)
  } catch (error) {
    console.lof(err)
    return err
  }
}

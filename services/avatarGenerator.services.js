import AvatarGenerator from 'avatar-generator'
import path from 'path'
import config from 'config'

const PORT = config.get('PORT')

const generatorGender = () => {
  const generate = Math.floor(Math.random() * Math.floor(2))
  return generate ? 'female' : 'male'
}

export const generateAvatar = async (email, gender = generatorGender()) => {
  const avatar = new AvatarGenerator({
    parts: ['background', 'face', 'clothes', 'head', 'hair', 'eye', 'mouth'], //order in which sprites should be combined
    partsLocation: path.join(__dirname, '../services//img'), // path to sprites
    imageExtension: '.png' // sprite file extension
  })

  const variant = gender // By default 'male' and 'female' supported
  const nameImage = email.split('@')[0]
  const image = await avatar.generate(email, variant)
  image.toFile(`tmp/${nameImage}.png`)

  return {
    imagePath: `http://localhost:${PORT}/default-image/${nameImage}.png`,
    gender: gender || variant
  }
}

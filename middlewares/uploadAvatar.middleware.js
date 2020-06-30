import multer from 'multer'

export const avatarUploader = () => {
  const storage = multer.diskStorage({
    destination: (req, res, cb) => {
      cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
      const userId = req.user.id
      cb(null, `${userId}.jpg`)
    }
  })
  return multer({ storage })
}

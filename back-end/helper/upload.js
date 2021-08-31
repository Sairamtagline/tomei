const multer  = require('multer')
let filePath = '';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
    // cb(null, __dirname + '/../uploads')
  },
  
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    filePath = file.fieldname + '-' + uniqueSuffix + '.'+ file.mimetype.split('/')[1];
    req.body.profilePic = filePath
    cb(null, filePath)
  }
})



const upload = multer({ storage: storage })

module.exports = upload
const Book = require('../models/Book')
const multer = require('multer')

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        if (file.mimetype === 'application/pdf') {
            cb(null, 'uploads'); // folder for PDFs
          } else if (file.mimetype.startsWith('image/')) {
            cb(null, 'public/covers'); // folder for images
          } else {
            cb(new Error('Invalid file type'), false);
          }
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+'-'+file.originalname)
    }
});
const upload = multer({storage})
module.exports = upload


// const Book = require('../models/Book')
// const multer = require('multer')

// const storage = multer.diskStorage({
//     destination:(req,file,cb)=>{
//         if (file.mimetype === 'application/pdf') {
//             cb(null, 'uploads'); // folder for PDFs
//           } else if (file.mimetype.startsWith('image/')) {
//             cb(null, 'public/covers'); // folder for images
//           } else {
//             cb(new Error('Invalid file type'), false);
//           }
//     },
//     filename:(req,file,cb)=>{
//         cb(null,Date.now()+'-'+file.originalname)
//     }
// });
// const upload = multer({storage})
// module.exports = upload

const Book = require('../models/Book')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        // BOOK FILE (should NOT be image)
        if (file.fieldname === "bookfile") {
            if (!file.mimetype.startsWith("image/")) {
                return cb(null, "uploads"); // folder for actual book files
            } else {
                return cb(new Error("Book file cannot be an image"), false);
            }
        }

        // BOOK COVER (should be image)
        if (file.fieldname === "bookcover") {
            if (file.mimetype.startsWith("image/")) {
                return cb(null, "public/covers"); // folder for covers
            } else {
                return cb(new Error("Book cover must be an image"), false);
            }
        }

        // Any other unexpected file field → accept safely
        return cb(null, "uploads");
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {

    // BOOK FILE → must NOT be image
    if (file.fieldname === "bookfile") {
        return !file.mimetype.startsWith("image/")
            ? cb(null, true)
            : cb(new Error("Book file cannot be an image"), false);
    }

    // BOOK COVER → must be image
    if (file.fieldname === "bookcover") {
        return file.mimetype.startsWith("image/")
            ? cb(null, true)
            : cb(new Error("Book cover must be an image"), false);
    }

    // Unknown fields → accept without error
    return cb(null, true);
};

const upload = multer({ storage, fileFilter });

module.exports = upload;

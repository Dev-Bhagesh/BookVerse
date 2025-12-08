const express = require("express");
const router = express.Router();
const { registerUser, loginUser, forgotPassword } = require("../controllers/authController");
const upload = require("../controllers/bookupload")
const { uploadBook } = require("../controllers/bookController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);

router.post('/upload-book',
    upload.fields([
        { name: 'bookfile', maxCount: 1 },
        { name: 'bookcover', maxCount: 1 }
    ]),
    uploadBook
);

module.exports = router;

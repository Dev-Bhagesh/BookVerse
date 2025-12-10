const Book = require('../models/Book');
const User = require('../models/User');
const fs = require('fs');
const path = require('path');

exports.uploadBook = async (req, res) => {

  try {
    // 1️⃣ Check session
    const userId = req.session.userId;
    const uploaderusername = req.session.username;
    if (!userId || !req.session.isLoggedIn) {
      return res.status(401).json({ error: "You must be logged in" });
    }

    // 2️⃣ Read form inputs
    const title = req.body.booktitleinput;
    const author = req.body.authorname;
    const gener = req.body.generinput;
    const uploaderID = userId;

    // 3️⃣ Safely read uploaded files
    const coverFile = req.files['bookcover'] ? req.files['bookcover'][0] : null;
    const pdfFile = req.files['bookfile'] ? req.files['bookfile'][0] : null;

    if (!coverFile || !pdfFile) {
      return res.status(400).json({ error: "Both cover image and PDF file are required" });
    }

    // const coverImagePath = coverFile.path;
    // const pdfFilePath = pdfFile.path;
    const coverImagePath = `covers/${coverFile.filename}`;
    const pdfFilePath = `uploads/${pdfFile.filename}`;
    
    // 4️⃣ Save book in DB
    const newBook = new Book({
      uploaderID,
      uploaderusername,
      title,
      author,
      gener,
      coverpath: coverImagePath,
      pdfpath: pdfFilePath
    });

    await newBook.save();

    // 5️⃣ Link book to logged-in user
    await User.findByIdAndUpdate(
      userId,
      { $push: { uploadedbooksID: newBook._id } },
      { new: true }
    );

    // 6️⃣ Redirect or respond
    res.redirect('/myprofile?success=1');

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed" });
  }
};

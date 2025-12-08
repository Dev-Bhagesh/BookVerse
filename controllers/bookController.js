// const Book = require('../models/Book');

// exports.uploadBook = async (req, res) => {
//     try {
//         const { title, author, genre } = req.body;

//         const coverImage = req.files['cover'][0].path;
//         const pdfFile = req.files['pdf'][0].path;

//         const newBook = new Book({
//             title,
//             author,
//             genre,
//             coverImage,
//             pdfFile
//         });

//         await newBook.save();

//         res.json({ message: "Book uploaded!", book: newBook });

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: "Upload failed" });
//     }
// };
// --------------------------------------------------------------------------------------------------------------------
// const Book = require('../models/Book');
// const User = require('../models/User');

// exports.uploadBook = async (req, res) => {
//     try {
//         // 1️⃣ Get user from session
//         const userId = req.session.userId;
//         if (!userId || !req.session.isLoggedIn) {
//             return res.status(401).json({ error: "You must be logged in" });
//         }

//         // 2️⃣ Get book info from form
//         const { title, author, gener } = req.body;
//         const coverImage = req.files['bookcover'][0].path;
//         const pdfFile = req.files['bookfile'][0].path;

//         // 3️⃣ Create new book
//         const newBook = new Book({ title, author, gener, coverImage, pdfFile });
//         await newBook.save();

//         // 4️⃣ Link book to user
//         await User.findByIdAndUpdate(
//             userId,
//             { $push: { uploadedBooks: newBook._id } },
//             { new: true }
//         );

//         res.json({ message: "Book uploaded successfully!", book: newBook });

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: "Upload failed" });
//     }
// };
// -----------------------------------------------------------------------------------------------------------------------------

const Book = require('../models/Book');
const User = require('../models/User');

exports.uploadBook = async (req, res) => {
    try {
        // 1️⃣ Check session
        const userId = req.session.userId;
        const uploaderusername = req.session.username;
        if (!userId || !req.session.isLoggedIn) {
            return res.status(401).json({ error: "You must be logged in" });
        }

        // 2️⃣ Read correct form input names
        const title = req.body.booktitleinput;
        const author = req.body.authorname;
        const gener = req.body.generinput;
        const uploaderID = userId;

        // 3️⃣ Read uploaded files with correct keys
        const coverImage = req.files['bookcover'][0].path;
        const pdfFile = req.files['bookfile'][0].path;

        // 4️⃣ Save in correct schema field names
        const newBook = new Book({
            uploaderID,
            uploaderusername,
            title,
            author,
            gener,
            coverpath: coverImage,
            pdfpath: pdfFile
        });

        await newBook.save();

        // 5️⃣ Link book to logged-in user
        await User.findByIdAndUpdate(
            userId,
            { $push: { uploadedbooksID: newBook._id } },
            {new:true}
        );
        // res.json({ message: "Book uploaded successfully!", book: newBook });
        res.redirect('/myprofile?success=1')
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Upload failed" });
    }
};

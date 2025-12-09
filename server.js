const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const User = require("./models/User")
const Book = require("./models/Book")
const path = require('path');
const session = require('express-session')
const app = express();


// Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/fullstack-auth", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// Middleware
app.set('view engine','ejs')
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(session({
    secret:"I_Wish_For_One_Thousend_Lifes_FromGod_And_In_EveryOneOfThem_I_Will_Love_You_In_Every_Single_One_Of_Them_More_Then_The_Previous_One",
    resave:false,
    saveUninitialized:false,
    cookie:{
        secure:false,
        maxAge:1000*60*60,
        sameSite:'lax'
    }
}))
app.use(cors({ origin: "http://localhost:5000", credentials: true }));

// Routes

app.get("/login",(req,res)=>{
    res.sendFile(path.join(__dirname,'views','login.html'));
})

app.get("/homepage",(req,res)=>{
    res.sendFile(path.join(__dirname,'views','homepage.html'));
})

app.get("/gener",(req,res)=>{
    res.sendFile(path.join(__dirname,'views','gener.html'));
})

app.post('/create-session',async(req,res)=>{
    const {username} = req.body;
    const userid = await User.findOne({username})
    req.session.userId = userid._id;
    req.session.username = username;
    req.session.isLoggedIn = true;
    return res.json({
        success:true,
        message:"session created successfully"
    })
})

app.get('/myprofile',async(req,res)=>{
    try{
        const userId = req.session.userId;
        if(!userId) return res.redirect('/login')

        const user = await User.findById(userId);
        const bookIDs = user.uploadedbooksID;

        const books = await Book.find({_id:{$in:bookIDs}});

        res.render('myprofile',{
            username:user.username,
            bio : user.bio,
            book:books,
            success : req.query.success
        })
    } catch(err){
        console.log(err)
    }    
})

app.get('/bookspage',async(req,res)=>{
    const books = await Book.find()
    res.render('books',{book:books})
})

app.use("/api", authRoutes);
app.listen(5000, () => console.log(`server running on http://localhost:5000/login`));

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
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
app.use(express.json());
app.use(cors());
app.use(session({
    secret:"I_Wish_For_One_Thousend_Lifes_FromGod_And_In_EveryOneOfThem_I_Will_Love_You_In_Every_Single_One_Of_Them_More_Then_The_Previous_One",
    resave:false,
    saveUninitialized:false,
    cookie:{
        secure:false,
        maxAge:1000*60*60
    }
}))

// Routes
app.use("/api", authRoutes);

app.get("/login",(req,res)=>{
    res.sendFile(path.join(__dirname,'views','login.html'));
})

app.get("/homepage",(req,res)=>{
    res.sendFile(path.join(__dirname,'views','homepage.html'));
})

app.get("/gener",(req,res)=>{
    res.sendFile(path.join(__dirname,'views','gener.html'));
})

// app.get("/myprofile",(req,res)=>{
//     // res.sendFile(path.join(__dirname,'views','myprofile.html'))
//     let username = "Kenji";
//     let bio = " Hay this is my ejs testing is this working or not and good news is it is working"
//     res.render('myprofile',{username:username,bio:bio})
// })

// app.get('/myprofile',(req,res)=>{
//     res.render('myprofile',{
//         profilePic : null,
//         username : 'guest account',
//         bio : "I am Bhagesh and nice to meet you",
//         posts:[]
//     })
// })

app.post('/create-session',(req,res)=>{
    const {username} = req.body;
    req.session.username = username;
    req.session.isLoggedIn = true;
    return res.json({
        success:true,
        message:"session created successfully"
    })
})

app.get('/myprofile',(req,res)=>{
    res.render('myprofile',{username:req.session.username,bio:null,})
})


app.post('/editbio',(req,res)=>{
    
})


app.listen(5000, () => console.log("Server running on port 5000"));

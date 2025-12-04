const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const path = require('path');

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

app.get("/myprofile",(req,res)=>{
    res.sendFile(path.join(__dirname,'views','myprofile.html'))
})

app.get('/myprofile',(req,res)=>{
    res.render('myprofile',{
        profilePic : null,
        username : 'guest account',
        bio : "I am Bhagesh and nice to meet you",
        posts:[]
    })
})



app.listen(5000, () => console.log("Server running on port 5000"));

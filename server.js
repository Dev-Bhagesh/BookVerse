const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const path = require('path');


const app = express();

app.use(express.static(path.join(__dirname, 'public')));

// Middleware
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

// Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/fullstack-auth", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));


app.listen(5000, () => console.log("Server running on port 5000"));

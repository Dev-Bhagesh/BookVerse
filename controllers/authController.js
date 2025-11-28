const User = require("../models/User");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const sendMail = require("../controllers/sendmail")
// const nodemailer = require("nodemailer");

// Register
exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user exists
        let user = await User.findOne({ $or: [{ email }, { username }] });
        if (user) return res.status(400).json({ message: "User already exists" });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        user = new User({ username, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ success: true, message: "User registered successfully" });

        // res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// Login
exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // res.status(200).json({ message: `Welcome ${user.username}` });
        res.status(200).json({ success: true, username: user.username, message: `Welcome ${user.username}` });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
    const {username}=req.body;
    if(!username){
        return res.status(400).json({message:"Username is required"});
    }

    try{
        const user = await User.findOne({username});
        if(!user){
            return res.status(404).json({message:"User not found"});
        }

        const resetToken = crypto.randomBytes(32).toString("hex");
        user.resetToken = resetToken;
        user.resetTokenExpiry = Date.now() + 1000 *60 *15;
        await user.save();
        const resetLink = `http://localhost:5000/reset-password?${resetToken}`;

        await sendMail(user.email,"Password reset email",`Click the link to reset your password : ${resetLink}`);

        return res.json({message:"Password reset link sent to your mail "})

    }catch(err){
        res.status(500).json({message:"Server error" });
    }
}
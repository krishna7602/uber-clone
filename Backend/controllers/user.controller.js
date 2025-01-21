const { options } = require('../app');
const User = require('../models/user.model');
const userservice = require('../services/user.service');
const {validationResult, cookie} = require('express-validator');
const cookieParser = require('cookie-parser');
const blacklistToken = require('../models/blaclist.model');

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { fullName, email, password } = req.body;

        // Check for duplicate email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email is already registered." });
        }

        // Hash password and create user
        const hashPassword = await User.hashPassword(password);
        const user = await userservice.createUser({
            firstName: fullName.firstName,
            lastName: fullName.lastName,
            email,
            password: hashPassword,
        });

        // Generate auth token
        const token = user.generateAuthToken();

        res.status(201).json({ user, token });
    } catch (error) {
        console.error('Error in registerUser:', error); // Log the error
        res.status(500).json({ message: 'Something went wrong. Please try again.' });
    }
};

module.exports.loginUser=async(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try {
        const {email,password}=req.body;
        console.log(email);
        console.log(password);

        const user=await User.findOne({email}).select('+password');

        if(!user){
            return res.status(401).json({message:"User not found"});
        }

        const isMatch=await user.comparePassword(password);
        if(!isMatch){
            return res.status(401).json({message:"Incorrect Password"});
        }

        const token=user.generateAuthToken();

    

        res.cookie('token',token);

        res.status(200).json({user,token});
        
    } catch (error) {
        console.log("error in login user",error.message);
    }   
} 

module.exports.getUserProfile=async(req,res,next)=>{
    res.status(200).json({user:req.user});
}

module.exports.logoutUser=async(req,res,next)=>{
    res.clearCookie('token');
    const token=req.cookies.token || req.headers.authorization.split(' ')[1];
    await blacklistToken.create({token});
    res.status(200).json({message:"Logged out successfully"});
}
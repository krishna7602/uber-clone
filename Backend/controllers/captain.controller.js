const express = require('express');
const Captain = require('../models/captain.model');
const captainService = require('../services/captain.service');
const {validationResult} = require('express-validator');
const Blacklist = require('../models/blaclist.model');


module.exports.registerCaptain = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors)
        return res.status(401).json({errors: errors.array()});
    }

    try{
        const {email, password, fullName, vehicle, socketId} = req.body;
        const {color, plate, capacity, vehicleType} = vehicle;
        const hashPassword = await Captain.hashPassword(password);

        const existingCaptain = await Captain.findOne({email});
        if(existingCaptain){
            return res.status(400).json({error: 'Captain already exists'});
        }
    
        console.log(fullName)
        const captain = await captainService.createCaptain({firstName:fullName.firstName, lastName:fullName.lastName, email, password:hashPassword, color:vehicle.color, plate:vehicle.plate, capacity:vehicle.capacity, vehicleType:vehicle.vehicleType}); 
        console.log(captain)
        const token = captain.generateAuthToken();
        res.status(201).json({captain, token});
    }catch(err){
        res.status(410).json({error: err.message});
    }
}

module.exports.loginCaptain = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the captain by email and include the password field
        const captain = await Captain.findOne({ email }).select('+password');

        if (!captain) {
            return res.status(404).json({ error: 'Captain not found' });
        }

        // Compare the provided password with the hashed password
        const isMatch = await captain.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate auth token
        const token = captain.generateAuthToken();

        res.cookie('token', token);
        res.status(200).json({ captain, token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};




module.exports.getProfile = async (req, res) => {
    try {
        const captain = req.captain;
        res.status(200).json({captain});
    } catch (error) {
        res.status(410).json({error: error.message});
    }
}


module.exports.logoutCaptain = async (req, res) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        await Blacklist.create({token});
        const captain = req.captain;
        res.clearCookie('token');
        res.status(200).json({message: 'Logged out successfully'});
    } catch (error) {
        res.status(410).json({error: error.message});
    }
}
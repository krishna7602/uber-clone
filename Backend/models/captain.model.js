const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
    fullName:{
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    sockedId: {
        type: String,
    },

    status:{
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
    },

    vehicle:{
        color: {
            type: String,
            required: true,
        },
        plate:{
            type: String,
            required: true,
        },
        capacity:{
            type: Number,
            required: true,
        },
        vehicleType:{
            type: String,
            enum: ["car", "motorcycle","auto"],
            required: true,
        },
    },
    location:{
        lat:{
            type: Number,
        },
        lng:{
            type: Number,
        },
    }

});


captainSchema.methods.generateAuthToken = function(){
    const token=jwt.sign({_id: this._id}, process.env.JWT_SECRET,{expiresIn:'24h'});
    return token;
}

captainSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
}


const Captain=mongoose.model('Captain', captainSchema);


module.exports = Captain;




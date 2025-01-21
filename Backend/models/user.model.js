const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema(
    {
        fullName:{
            firstName:{
                type: String,
                required: true,
                minlength:[3, 'First name should be at least 3 characters long']
            },
            lastName:{
                type: String,
            }
        },
        email:{
            type: String,
            required: true,
            unique: true
        },
        password:{
            type: String,
            required: true,
            select:false
        },

        socketId:{
            type: String,
        },

    }, 

    { timestamps: true }
);


userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET,{expiresIn: '24h'});
    return token;
}

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}


userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
}


const User = mongoose.model('User', userSchema);

module.exports = User;
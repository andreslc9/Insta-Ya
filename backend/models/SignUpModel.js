const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const signUpTemplate = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    LastName:{
        type:String,
        required:true
    },
    User:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    }
});

signUpTemplate.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id:this._id}, process.env.JWTPRIVATEKEY,{expiresIn:"7d"})
    return token
};

const User = mongoose.model('user', signUpTemplate);

const validate = (data) => {
    const schema = Joi.object({
        Name: Joi.string().required().label("Name"),
        LastName: Joi.string().required().label("LastName"),
        User: Joi.string().required().label("User"),
        Password: passwordComplexity().required().label("Password"),
        Email: Joi.string().email().required().label("Email"),
    });
    return schema.validate(data)
};

module.exports = {User, validate};
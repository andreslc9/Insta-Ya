const mongoose = require('mongoose');
const Joi = require('joi');

const orderTemplate = new mongoose.Schema({
    Author:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    Tracing:{
        type:String,
        required:true
    },
    Date:{
        type:Date,
        required:true
    },
    Large1:{
        type:Number,
        required:true
    },
    Large2:{
        type:Number,
        required:true
    },
    Height:{
        type:Number,
        required:true
    },
    Weight:{
        type:Number,
        required:true
    },
    InitialAddress:{
        type: String,
        required:true
    },
    InitialCity:{
        type: String,
        required:true
    },
    Destinatary:{
        type: String,
        required:true
    },
    IdDestinatary:{
        type: String,
        required:true
    },
    FinalAddress:{
        type: String,
        required:true
    },
    FinalCity:{
        type: String,
        required:true
    },
    State:{
        type: String,
        required:true
    },

}
);

const Order = mongoose.model('order', orderTemplate);

const validate = (data) => {
    const schema = Joi.object({
        Author: Joi.string().required().label("Author"),
        Date: Joi.string().required().label("Date"),
        Large1: Joi.string().required().label("Large1"),
        Large2: Joi.string().required().label("Large2"),
        Height: Joi.string().required().label("Height"),
        Weight: Joi.string().required().label("Weight"),
        InitialAddress: Joi.string().required().label("InitialAddress"),
        InitialCity: Joi.string().required().label("InitialCity"),
        Destinatary: Joi.string().required().label("Destinatary"),
        IdDestinatary: Joi.string().required().label("IdDestinatary"),
        FinalAddress: Joi.string().required().label("FinalAddress"),
        FinalCity: Joi.string().required().label("FinalCity"),
        State: Joi.string().required().label("State"),
    });
    return schema.validate(data)
};

module.exports = {Order, validate};
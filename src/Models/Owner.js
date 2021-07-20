const mongoose = require("mongoose");
const validator = require('validator')
const AccountSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Number:{
        type:String,
        required:true
    },
    Email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                    throw new Error('Email is invalid')
            }
        }
    },
    Password:{
        type:String,
        required:true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],

},{ collection: "Account", timestamp: true }
);

const model = mongoose.model("AccountSchema", AccountSchema);

module.exports = model;
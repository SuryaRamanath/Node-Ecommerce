const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Price:{
        type:Number,
        required:true
    },
    ImageURL:{
        type:String,
        required:true
    },
    Availability:{
        type:Boolean,
        required:true
    },
    Brand:{
        type:String,
        required:true
    },
    Orders: [{
        customer: {
            type: String,
            required: true
        }
    }],

},{ collection: "Product", timestamp: true }
);

const model = mongoose.model("ProductSchema", ProductSchema);

module.exports = model;
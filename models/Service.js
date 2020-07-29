const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ServiceSchema = new Schema({
    userID:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    title:{
        type:String
    },
    image:{
        type:String
    },
    desc:{
        type:String
    },
    price:{
        type:Number
    },
    rating:{
        type:Number
    },
    category:{
        type:String
    },
    desc:{
        type:String
    },
    processtime:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
})

const Service = mongoose.model('services', ServiceSchema);

module.exports = Service;
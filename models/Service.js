const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ServiceSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true
    },
    rating:{
        type:Number,
        required:true
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
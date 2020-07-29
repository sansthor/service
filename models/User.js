const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = new Schema({
    //register user default
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
    },
    //register service
    skills:{
        type:String
    },
    phone:{
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

const User = mongoose.model('users', UserSchema);

module.exports = User;
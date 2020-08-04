const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = new Schema({
    //register user default
    fullname:{
        type:String,
    },
    username:{
        type:String,
        unique:true
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
    },
    address:{
        type:String,
    },
    avatar:{
        type:String,
    },
    //register service
    skills:{
        type:String
    },
    link:{
        type:String
    },
    phone:{
        type:String
    },
    role:{
        type:String,
        default:'USER'
    },
    bankname:{
        type:String
    },
    bankaccnumber:{
        type:String
    },
    bankaccname:{
        type:String
    },
    balance:{
        type:Number
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
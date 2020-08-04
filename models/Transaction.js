const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    talentID:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    userID:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    status:{
        type:String,
        default:'IN PROGRESS'
    },
    talentStatus:{
        type:String,
        default:'IN PROGRESS'
    },
    userStatus:{
        type:String,
        default:'IN PROGRESS'
    },
    total:{
        type:Number
    },
    quantity:{
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

const Transaction = mongoose.model('transaction', TransactionSchema)

module.exports = Transaction;
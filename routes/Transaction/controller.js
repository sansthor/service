const {Transaction} = require('../../models');

module.exports = {
    checkout: async (req,res) =>{
        try{
            const result = await Transaction.create({...req.body})
            res.status(200).send({message:'Order sent', data:result})
        }
        catch(error){
            res.status(403).send(error)
        }
    },
    getTransaction: async (req,res) => {
        try{
            const result = await Transaction.find()
            res.send({message:'All transaction', data:result})
        }
        catch(error){
            res.send(error)
        }
    },
    getTransactionById: async (req,res) =>{
        const {transactionID} = req.params
        try{
            const result = await Transaction.find({transactionID}).populate('transactionID')
            res.send({message:'get transaction by id', data:result})
        }
        catch(error){
            res.send(error)
        }
    },
    getStatusCompleted: async (req,res) => {
        const {id} = req.params
        try{
            const result = await Transaction.find({_id:id}).where({status:'DONE'})
            res.send({message:'all status completed', data:result})
        }
        catch(error){
            res.send(error)
        }
    },
    updateStatusTransaction: async (req,res) => {
        const {id} = req.params
        try{
            const result = await Transaction.findByIdAndUpdate(id,{status:'DONE'})
            res.send({message:'status change to done', data:result})
        }
        catch(error){
            res.send(error)
        }
    }
}
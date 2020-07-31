const {Service} = require('../../models')

module.exports = {
    getService: async (req,res) =>{
        try{
            const result = await Service.find()
            res.send({message:'get all services', data:result})
        }
        catch(error){
            res.send(error)
        }
    },
    //dropdown category
    getFilterCategory: async (req,res) =>{
        const category = req.params
        try{
            const result = await Service.findOne({category:category}).exec()
            res.send({message:'get filter services', data:result})
        }
        catch(error){
            res.send(error)
        }
    },
    postService: async (req,res) =>{
        try{
            const result = await Service.create({...req.body, userID:req.token.id})
            res.send({message:'post success', data:result})
        }
        catch(error){
            res.send(error)
        }
    },
    getUserUpload: async (req,res) =>{
        const {userID} = req.params
        try{
            const result = await Service.find({userID}).populate('userID')
            res.send({message:'get user upload', data:result})
        }
        catch(error){
            res.send(error)
        }
    },
    //get detail service
    getDetails: async (req,res) =>{
        const {title} = req.params
        try{
            const result = await Service.findOne({title:title})
            res.send({message:'get details', data:result})
        }
        catch(error){
            res.send(error)
        }
    }
}
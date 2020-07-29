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
    getFilterService: async (req,res) =>{
        const title = req.body.title
        try{
            const result = await Service.findOne({title:title}).exec()
            res.send({message:'get filter services', data:result})
        }
        catch(error){
            res.send(error)
        }
    }
}
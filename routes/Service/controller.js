const {Service} = require('../../models')

module.exports = {
    addSkills: async (req,res) =>{
        try{
            const result = await Service.create({...req.body})
            res.send({message:'skill added', data:result})
        }
        
        catch(error){
            res.send(error)
        }
    },
    updateSkills: async (req,res) =>{
        const {id} = req.params;
        try{
            const result = await Service.findByIdAndUpdate(id,{...req.body})
            res.send({message:'skill updated', data:result})
        }
        catch(error){
            res.send(error)
        }
    },
    
}
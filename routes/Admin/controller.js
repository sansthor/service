const {Admin} = require ('../../models')
const {hash,compare} = require('../../helpers');
const {createToken} = require('../../helpers');

module.exports = {
    registerAdmin: async (req,res) =>{
        try{
            
            const {password} = req.body;
            const hashed = await hash(password);

            const result = await Admin.create({...req.body,password:hashed});

            res.send({message:'Registration Success', data:result})
        }
        catch(error){
            res.send({message:'email sudah terdaftar'})
        }
    }
}
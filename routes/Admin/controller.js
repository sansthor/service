const {Admin, User} = require ('../../models')
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
    },
    loginAdmin: async (req,res) =>{
        try{
            const {email, password} = req.body;
            const registeredAdmin = await Admin.findOne({email:email})
            
            if(registeredAdmin !== null){
                const compared = await compare(password,registeredAdmin.password)
               if(compared === true){
                const token = await createToken({
                    id:registeredAdmin._id,
                    email:registeredAdmin.email,
                    username:registeredAdmin.username
                })
                
                res.send({message:'log in success', result:token});
               }
               else{
                res.status(403).send({message:'email or password incorrect'})
            }
        }
          else{
              res.status(403).send({message:'email not registered'})
          } 
        }
    
        catch(error){
            console.log(error);
            res.send({message:error.message})
        }
    },
    getUser: async (req, res) => {
        try {
            const result = await User.find()
            res.send({message:'get data', data:result})
        } catch {
            res.send({message:error.message})
        }
    }
}
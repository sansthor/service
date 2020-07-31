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
            res.send({message:'Email Registered'})
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
                
                res.send({message:'Login successfull', result:token});
               }
               else{
                res.status(403).send({message:'Email or Password incorrect'})
            }
        }
          else{
              res.status(403).send({message:'Email not Registered'})
          } 
        }
    
        catch(error){
            console.log(error);
            res.send({message:error.message})
        }
    },
    getDataUser: async (req,res) =>{
        try{
            const result = await User.find()
            res.send({message:'Data Succesfull', data:result})
        }
        catch(error){
            res.send({message:error.message})
        }
      
    },
    getUserById: async(req,res) =>{
        const {id} = req.params
        try{
            const result = await User.findById(id).exec()
            res.send({message:'Get By Id', data:result})
        }
        catch(error){

        }
    },
    updateUserData: async (req,res) =>{
        const {id} = req.params;
        try{
            const result = await User.findByIdAndUpdate(id,{
                ...req.body
            })
            res.send({message:'update success', data:result})
        }
        catch(error){
            console.log(error);
            res.send({message:error.message})
        }
    },
}
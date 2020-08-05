const {
    Service
} = require('../../models')

module.exports = {
    //dropdown category
    getFilterCategory: async (req, res) => {
        const category = req.params
        try {
            const result = await Service.findOne({
                category: category
            }).exec()
            res.send({
                message: 'get filter services',
                data: result
            })
        } catch (error) {
            res.send(error)
        }
    },
    postService: async (req, res) => {
        try {
            const result = await Service.create({
                ...req.body,
                userID: req.token.id
            })
            res.send({
                message: 'post success',
                data: result
            })
        } catch (error) {
            res.send(error)
        }
    },
    getUserUpload: async (req, res) => {
        const {
            userID
        } = req.params
        try {
            const result = await Service.find({
                userID
            }).populate('userID')
            res.send({
                message: 'get user upload',
                data: result
            })
        } catch (error) {
            res.send(error)
        }
    },
    //get detail service
    getDetails: async (req, res) => {
        const {
            id
        } = req.params
        try {
            const result = await Service.findById(
                id
            ).populate('userID')
            res.send({
                message: 'get details',
                data: result
            })
        } catch (error) {
            res.send(error)
        }
    },
    deleteService: async (req, res) => {
        const {
            id
        } = req.params
        try {
            const result = await Service.findByIdAndDelete(id)
            res.send({
                message: 'service deleted',
                data: result
            })
        } catch (error) {
            res.send(error)
        }
    },
    getAllServices: async (req,res) =>{
        try{
            const result = await Service.find()
            res.send({message:'get all services', data:result})
        }
        catch(error){
            res.send(error)
        }
    }
}
const {
    Admin,
    User,
    Service,
    Transaction
} = require('../../models')
const {
    hash,
    compare
} = require('../../helpers');
const {
    createToken
} = require('../../helpers');

module.exports = {
    registerAdmin: async (req, res) => {
        try {

            const {
                password
            } = req.body;
            const hashed = await hash(password);

            const result = await Admin.create({
                ...req.body,
                password: hashed
            });

            res.send({
                message: 'Registration Success',
                data: result
            })
        } catch (error) {
            res.send({
                message: 'Email Registered'
            })
        }
    },
    loginAdmin: async (req, res) => {
        try {
            const {
                email,
                password
            } = req.body;
            const registeredAdmin = await Admin.findOne({
                email: email
            })

            if (registeredAdmin !== null) {
                const compared = await compare(password, registeredAdmin.password)
                if (compared === true) {
                    const token = await createToken({
                        id: registeredAdmin._id,
                        email: registeredAdmin.email,
                        username: registeredAdmin.username
                    })

                    res.send({
                        message: 'Login successfull',
                        result: token
                    });
                } else {
                    res.status(403).send({
                        message: 'Email or Password incorrect'
                    })
                }
            } else {
                res.status(403).send({
                    message: 'Email not Registered'
                })
            }
        } catch (error) {
            res.send({
                message: error.message
            })
        }
    },
    getAdmin: async (req, res) => {
        try {
            const result = await Admin.find().sort({
                createdAt: 'desc'
            })
            res.send({
                message: 'Data Succesfull',
                data: result
            })
        } catch (error) {
            res.send({
                message: error.message
            })
        }

    },
    filterAdminData: async (req, res) => {
        const {
            username
        } = req.query

        try {
            const result = await Admin.find({
                username: {
                    $regex: username,
                    $options: 'i'
                }
            }).exec();

            res.send({
                data: result
            })
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    },
    getDataUser: async (req, res) => {
        try {
            const result = await User.find().sort({
                createdAt: 'desc'
            })
            res.send({
                message: 'Data Succesfull',
                data: result
            })
        } catch (error) {
            res.send({
                message: error.message
            })
        }

    },
    getUserById: async (req, res) => {
        const {
            id
        } = req.params
        try {
            const result = await User.findById(id).exec()
            res.send({
                message: 'Get By Id',
                data: result
            })
        } catch (error) {

        }
    },
    filterUserData: async (req, res) => {
        const {
            fullname
        } = req.query

        try {
            const result = await User.find({
                fullname: {
                    $regex: fullname,
                    $options: 'i'
                }
            }).exec();

            res.send({
                data: result
            })
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    },
    updateDataAdmin: async (req, res) => {
        const {
            id
        } = req.params;
        const {
            password
        } = req.body;
        const hashed = await hash(password);

        try {
            const result = await Admin.findByIdAndUpdate(id, {
                ...req.body,
                password: hashed
            })
            res.send({
                message: 'update success',
                data: result
            })
        } catch (error) {
            console.log(error);
            res.send({
                message: error.message
            })
        }
    },
    updateDataService: async (req, res) => {
        const {
            id
        } = req.params;
        try {
            const result = await Service.findByIdAndUpdate(id, {
                ...req.body
            })
            res.send({
                message: 'update success',
                data: result
            })
        } catch (error) {
            console.log(error);
            res.send({
                message: error.message
            })
        }
    },
    deleteAdminData: async (req, res) => {
        const {
            id
        } = req.params;

        try {
            await Admin.findByIdAndDelete(id);
            res.send({
                message: `User successfully deleted`,
            });
        } catch (error) {
            console.error(error);
        }
    },
    getServiceData: async (req, res) => {
        try {
            const result = await Service.find().populate('userID').sort({
                createdAt: 'desc'
            })
            res.send({
                message: 'Data Service Succesfull',
                data: result
            })
        } catch (error) {
            res.send({
                message: error.message
            })
        }
    },
    filterServiceData: async (req, res) => {
        const {
            title
        } = req.query

        try {
            const result = await Service.find({
                title: {
                    $regex: title,
                    $options: 'i'
                }
            }).exec();

            res.send({
                data: result
            })
        } catch (error) {
            res.send({
                message: error.message
            })
        }
    },
    transferBalance: async (req, res) => {
        const {
            id
        } = req.params
        try {
            const result = await Transaction.findById(id)
            const user = await User.findById(result.talentID)
            await User.findByIdAndUpdate(user._id, {
                balance: result.total + user.balance
            })

            await Transaction.findByIdAndUpdate(id, {
                total: 0,
                status: 'DONE'
            })
            res.status(200).send({
                message: 'transfer success',
                data: result
            })
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    },
    getStatusPending: async (req, res) => {
        try {
            const result = await Transaction.find({
                status: 'IN PROGRESS'
            })
            res.send({
                message: 'all status in progress',
                data: result
            })
        } catch (error) {
            res.send(error)
        }
    },
    getStatusDone: async (req, res) => {
        try {
            const result = await Transaction.find({
                status: 'DONE'
            })
            res.send({
                message: 'all status done',
                data: result
            })
        } catch (error) {
            res.send(error)
        }
    },
    getTransaction: async (req, res) => {
        try {
            const result = await Transaction.find().populate('talentID').populate('userID').sort({
                createdAt: 'desc'
            })
            res.send({
                message: 'All transaction',
                data: result
            })
        } catch (error) {
            res.send(error)
        }
    },
    filterTransactionData: async (req, res) => {
        const {
            status
        } = req.query

        try {
            const result = await Transaction.find({
                status: {
                    $regex: status,
                    $options: 'i'
                }
            }).exec();

            res.send({
                data: result
            })
        } catch (error) {
            console.log(error);
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
                message: 'delete service',
                data: result
            })
        } catch (error) {

        }
    }
}
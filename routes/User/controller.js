const { User, Transaction } = require('../../models');
const { hash, compare } = require('../../helpers');
const { createToken } = require('../../helpers');

module.exports = {
    get: async (req, res) => {
        try {
            const result = await User.find();
            res.send({ message: 'get data', data: result });
        } catch (error) {
            res.send({ message: error.message });
        }
    },
    getById: async (req, res) => {
        const { id } = req.params;
        try {
            const result = await User.findById(id).exec();
            res.send({ message: 'get by id', data: result });
        } catch (error) {}
    },
    register: async (req, res) => {
        try {
            const checkEmail = await User.findOne({
                email: req.body.email,
            }).exec();
            if (checkEmail) {
                res.status(403).send({
                    message: 'email or username already registered',
                });
            } else {
                const { password } = req.body;
                const hashed = await hash(password);

                const result = await User.create({
                    ...req.body,
                    password: hashed,
                });

                res.status(200).send({
                    message: 'Registration Success',
                    data: result,
                });
            }
        } catch (error) {
            res.status(403).send({ message: error });
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const registeredUser = await User.findOne({ email: email });
            if (registeredUser !== null) {
                const compared = await compare(
                    password,
                    registeredUser.password
                );
                if (compared === true) {
                    const token = await createToken({
                        id: registeredUser._id,
                        email: registeredUser.email,
                        username: registeredUser.username,
                    });
                    res.status(200).send({
                        message: 'log in success',
                        result: token,
                    });
                } else {
                    res.status(403).send({
                        message: 'email or password incorrect',
                    });
                }
            } else {
                res.status(403).send({ message: 'email not registered' });
            }
        } catch (error) {
            console.log(error);
            res.send({ message: error.message });
        }
    },
    updateUser: async (req, res) => {
        const { id } = req.params;
        const { password } = req.body;

        try {
            if (password) {
                const hashed = await hash(password);

                req.body.password = hashed;
            }
            
            const result = await User.findByIdAndUpdate(id, {
                ...req.body,
            });
            res.send({ message: 'update success', data: result });
        } catch (error) {
            console.log(error);
            res.send({ message: error.message });
        }
    },
    filterUser: async (req, res) => {
        // const q = req.query
        const username = req.body.username;
        try {
            const result = await User.find({ username: username }).exec();

            res.send({ data: result });
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    },
    registerService: async (req, res) => {
        const { id } = req.params;
        try {
            const result = await User.findByIdAndUpdate(id, { ...req.body });
            res.send({ message: 'service added', data: result });
        } catch (error) {
            res.send(error);
        }
    },
    registerBank: async (req, res) => {
        const { id } = req.params;
        try {
            const result = await User.findByIdAndUpdate(id, { ...req.body });
            res.send({ message: 'bank account added', data: result });
        } catch (error) {
            res.send(error);
        }
    },
    getAllOrderById: async (req, res) => {
        const talentID = req.params;
        try {
            const result = await Transaction.find(talentID)
                .populate('talentID')
                .populate('serviceID')
                .populate('userID');
            res.send({ message: 'get order for me', data: result });
        } catch (error) {
            res.send(error);
        }
    },
    logout: (req, res) => {
        req.logout();
        res.redirect('/users/login');
    },
};

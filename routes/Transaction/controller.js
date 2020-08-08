const { Transaction } = require('../../models');

module.exports = {
    checkout: async (req, res) => {
        try {
            const result = await req.body.transactionID.map(async (item) => {
                const response = await Transaction.findByIdAndUpdate(item.id, {
                    status: 'IN PROGRESS',
                    talentStatus: 'IN PROGRESS',
                    userStatus: 'IN PROGRESS',
                });

                return response;
            });

            Promise.all(result).then((values) => {
                res.status(200).send({ message: 'Order sent', data: values });
            });
        } catch (error) {
            console.log(error);
            res.status(403).send(error);
        }
    },
    getTransaction: async (req, res) => {
        try {
            const result = await Transaction.find();
            res.send({ message: 'All transaction', data: result });
        } catch (error) {
            res.send(error);
        }
    },
    getTransactionById: async (req, res) => {
        const { userID } = req.params;
        try {
            const result = await Transaction.find({
                userID,
                status: { $ne: 'CART' },
            })
                .populate('serviceID')
                .populate('userID')
                .populate('talentID');

            res.send({ message: 'get transaction by id', data: result });
        } catch (error) {
            res.send(error);
        }
    },
    getStatusCompleted: async (req, res) => {
        const { id } = req.params;
        try {
            const result = await Transaction.find({ _id: id }).where({
                status: 'DONE',
            });
            res.send({ message: 'all status completed', data: result });
        } catch (error) {
            res.send(error);
        }
    },
    cart: async (req, res) => {
        try {
            const result = await Transaction.create({ ...req.body });

            res.send({
                message: 'your transaction added to cart',
                data: result,
            });
        } catch (error) {
            console.log(error);
        }
    },
    cartByID: async (req, res) => {
        try {
            const { userID } = req.params;
            const result = await Transaction.find({ userID, status: 'CART' })
                .populate('serviceID')
                .populate('userID');

            res.send({
                message: 'get cart by userID',
                data: result,
            });
        } catch (error) {
            console.log(error);
        }
    },
    updateUserStatusTransaction: async (req, res) => {
        const { id } = req.params;
        try {
            const result = await Transaction.findByIdAndUpdate(id, {
                userStatus: 'DONE',
            });
            res.send({ message: 'status change to done', data: result });
        } catch (error) {
            res.send(error);
        }
    },
    updateTalentStatus: async (req, res) => {
        const { id } = req.params;

        try {
            await Transaction.findByIdAndUpdate(id, {
                talentStatus: 'DONE',
            });
            res.send({ message: 'status change' });
        } catch (error) {
            res.send(error);
        }
    },
    count: async (req, res) => {
        try {
            const { talentID } = req.params;
            const result = await Transaction.countDocuments({
                talentID,
                talentStatus: 'IN PROGRESS',
            });

            res.send({
                message: 'get count by talentID',
                data: result,
            });
        } catch (error) {
            console.log(error);
        }
    },
};

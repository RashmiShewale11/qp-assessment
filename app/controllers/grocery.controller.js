const { grocery, orders, user } = require('../models');
const jwt = require('jsonwebtoken');

const isAdminFunc = (req, res) => {
    const tokenWithBearer = req.headers["authorization"];
    const tokenWithoutBearer = tokenWithBearer.split(' ')[1];
    if (!tokenWithoutBearer) {
        return res.status(401).send({
            message: 'Please provide Token'
        });
    }
    let isAdmin = false;
    jwt.verify(tokenWithoutBearer, 'RASHMI', (err, decoded) => {
        if (err) {
            isAdmin = false;
        } else {
            if (decoded.role === 'admin' || decoded.role === 'Admin') {
                isAdmin = true;
            }
        }
    });
    return isAdmin;
}

const isUserFunc = (req, res) => {
    const tokenWithBearer = req.headers["authorization"];
    const tokenWithoutBearer = tokenWithBearer.split(' ')[1];
    if (!tokenWithoutBearer) {
        return res.status(401).send({
            message: 'Please provide Token'
        });
    }
    let isUser = false;
    jwt.verify(tokenWithoutBearer, 'RASHMI', (err, decoded) => {
        if (err) {
            isUser = false;
        } else {
            if (decoded.role === 'user' || decoded.role === 'User') {
                isUser = true;
            }
        }
    });
    return isUser;
}

exports.getAllGroceryList = (req, res) => {

    grocery.findAll({})
        .then((data) => {
            return res.status(200).send({
                Output: data
            });
        }).catch((err) => {
            return res.status(500).send({
                message: err.message || 'Error While Fetching the data'
            });
        });
}

exports.postGrocery = (req, res) => {
    const isAdmin = isAdminFunc(req, res);

    if (!isAdmin) {
        return res.status(401).send({
            message: 'Only Admin Can access this API'
        });
    }
    if (!(req.body.itemName && req.body.itemPrice && req.body.itemInventory)) {
        return res.status(400).send({
            message: "Item name, price and inventory are required "
        });
    }

    const inputData = {
        itemName: req.body.itemName,
        itemPrice: req.body.itemPrice,
        itemInventory: req.body.itemInventory
    }

    grocery.create(inputData)
        .then((data) => {
            return res.status(200).send({
                message: 'Record Created',
                Output: data
            });
        }).catch((err) => {
            return res.status(500).send({
                message: err.message || 'Error While Inserting the data'
            });
        });
}

exports.updateById = (req, res) => {

    const isAdmin = isAdminFunc(req, res);

    if (!isAdmin) {
        return res.status(401).send({
            message: 'Only Admin Can access this API'
        });
    }
    const itemId = req.params.itemId;

    if (!itemId) {
        return res.status(400).send({
            message: 'itemId not provided'
        });
    }

    const inputData = {
        itemName: req.body.itemName,
        itemPrice: req.body.itemPrice,
        itemInventory: req.body.itemInventory
    }

    grocery.findOne({
        where: {
            itemId: itemId
        }
    })
        .then((data) => {
            if (!data) {
                return res.status(400).send({
                    messgae: `No Data Present for Id: ${itemId}`
                });
            }
            grocery.update(inputData, {
                where: {
                    itemId: itemId
                }
            }).then((updatedData) => {
                return res.status(200).send({
                    message: `${updatedData} item Updated`
                });
            }).catch((err) => {
                return res.status(500).send({
                    message: err.message || `Error While Updating the data`
                });
            });
        }).catch((err) => {
            return res.status(500).send({
                message: err.message || `Error While Fetching the data`
            });
        });
}

exports.deleteById = (req, res) => {
    const isAdmin = isAdminFunc(req, res);

    if (!isAdmin) {
        return res.status(401).send({
            message: 'Only Admin Can access this API'
        });
    }
    const itemId = req.params.itemId;

    if (!itemId) {
        return res.status(400).send({
            message: 'itemId not provided'
        });
    }


    grocery.findOne({
        where: {
            itemId: itemId
        }
    })
        .then((data) => {
            if (!data) {
                return res.status(400).send({
                    messgae: `No Data Present for Id: ${itemId}`
                });
            }
            grocery.destroy({
                where: {
                    itemId: itemId
                }
            }).then((Data) => {
                return res.status(200).send({
                    message: `${Data} grocery Deleted`
                });
            }).catch((err) => {
                return res.status(500).send({
                    message: err.message || `Error While Deleting the data`
                });
            });
        }).catch((err) => {
            return res.status(500).send({
                message: err.message || `Error While Fetching the data`
            });
        });
}

exports.postOrders = async (req, res) => {
    const isUser = isUserFunc(req, res);

    if (!isUser) {
        return res.status(401).send({
            message: 'Only User Can access this API'
        });
    }
    try {
        const inputData = req.body;
        if (inputData.length <= 0) {
            const customError = new Error("Please provide at least one record");
            customError.name = "CustomError";
            throw customError;
        }

        for(const {itemId, quantity, userId} of inputData){
            console.log('****in for', itemId, quantity, userId);
            const item = await grocery.findByPk(itemId);
            console.log('------in for item', item);
            if(!item ){
                return res.status(404).send({ error: `Item not found for itemId ${itemId}` });  
            }else if(item.itemInventory < quantity){
                return res.status(404).send({ error: `Not Sufficient Items for itemId ${itemId}` });  
            }

            item.itemInventory -= quantity;
            await item.save();
        }

        orders.bulkCreate(inputData)
            .then((data) => {
                return res.status(200).send({
                    message: 'Records Created',
                    Output: data
                });
            }).catch((err) => {
                return res.status(500).send({
                    message: err.message || 'Error While Inserting the data'
                });
            });

    } catch (err) {
        if (err.name === "CustomError") {
            return res.status(400).send({
                message: err.message
            });
        } else {
            return res.status(500).send({
                message: err.message || 'Error while creating record!'
            });
        }
    }
}
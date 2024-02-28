const uuid = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { user } = require('../models');

exports.login = (req, res) => {
    if (!(req.body.username && req.body.password)) {
        return res.status(400).send({
            message: "user name, password are required "
        });
    }

    user.findOne({
        where: {
            username: req.body.username
        }
    })
        .then((userData) => {
            if (!userData) {
                return res.status(401).send({ message: "Invalid Username" });
            }
            //check encryted password
            let passwordIsValid = bcrypt.compareSync(
                req.body.password,
                userData.password
            )

            //if Password is not valid
            if (!passwordIsValid) {
                return res.status(401).send({ message: "Invalid Password" });
            }

            const token = jwt.sign({ id: userData.userId, username: userData.username, role: userData.role }, 'RASHMI');

            return res.status(200).send({
                accessToken: token
            });

        }).catch((err) => {
            return res.status(500).send({
                message: err.message || 'Error While logging'
            });
        });
}

exports.postUser = (req, res) => {
    if (!(req.body.username && req.body.password && req.body.role)) {
        return res.status(400).send({
            message: "user name, password and role is required "
        });
    }

    var hasedPassword = bcrypt.hashSync(req.body.password, 8);
    const userInputData = {
        id: uuid.v4(),
        username: req.body.username,
        password: hasedPassword,
        role: req.body.role
    }

    user.create(userInputData)
        .then((data) => {
            return res.status(200).send({
                message: 'User Created',
                Output: data
            });
        }).catch((err) => {
            return res.status(500).send({
                message: err.message || 'Error While Inserting the data'
            });
        });
}

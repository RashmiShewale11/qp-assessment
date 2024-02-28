const router = require('express').Router();
const users = require('../controllers/users.controller');

module.exports = (app) =>{
    router.post('/login', users.login);
    router.post('/', users.postUser);
    
    app.use('/users', router);
};
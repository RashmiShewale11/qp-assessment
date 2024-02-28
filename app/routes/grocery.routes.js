const router = require('express').Router();
const grocery = require('../controllers/grocery.controller');

module.exports = (app) =>{
    router.post('/', grocery.postGrocery);
    router.get('/', grocery.getAllGroceryList);
    router.put('/:itemId',grocery.updateById);
    router.delete('/:itemId',grocery.deleteById);
    router.post('/orders',grocery.postOrders);
    app.use('/grocery', router);
};
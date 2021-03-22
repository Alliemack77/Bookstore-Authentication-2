const express = require('express');
const ordersRouter = express.Router();

// import controller functs
const controller = require('../controller/ordersController');

// Routes
// /orders
ordersRouter.get('/', (req, res) => {
    controller.getOrders(req, res);
});

// /orders/new
ordersRouter.post('/new', (req, res) => {
    controller.addOrder(req, res);
});


// orders/:id
ordersRouter.get('/:id', (req, res) => {
    controller.findOrder(req, res);
});

ordersRouter.put('/:id', (req, res) => {
    controller.updateOrder(req, res);
});

ordersRouter.delete('/:id', (req, res) => {
    controller.deleteOrder(req, res);
});


module.exports = ordersRouter;


const express = require('express');
const usersRouter = express.Router();
const {validationResult} = require('express-validator');


// import validation 
const { userValidator, resultsValidator } = require('../validation/userValidator');

// import controller functs
const controller = require('../controller/usersController');


// /users
usersRouter.get('/', (req, res) => {
    controller.getUsers(req, res);
});


// /users/new
usersRouter.post('/new', userValidator(), (req, res) => {

    const errors = validationResult(req).array();

    if(errors.length > 0) {
        resultsValidator(req, res, errors);
    }else {
        controller.addUser(req, res);
    }

});


// users/:id
usersRouter.get('/:id', (req, res) => {
    controller.findUser(req, res);
});

usersRouter.put('/:id', (req, res) => {
    controller.updateUser(req, res);
});

usersRouter.delete('/:id', (req, res) => {
    controller.deleteUser(req, res);
});



module.exports = usersRouter;
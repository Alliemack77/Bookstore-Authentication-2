const { check } = require('express-validator');
const { UserModel } = require('../models/userModel');

exports.userValidator = () => {
    return [
        check('fname').notEmpty().withMessage('First name is required').trim().escape(),
        check('lname').notEmpty().withMessage('Last name is required').trim().escape(),
        check('email', 'Email is required').isEmail().normalizeEmail().custom((value, {req}) => {
            return new Promise((resolve, reject) => {
                UserModel.findOne({email: req.body.email}, (err, user) => {
                    console.log(user);
                    if(user && user.email === req.body.email) {
                        console.log("ERR: ", err)
                        reject(new Error("Email already exists"))
                    }
                    if(!user){
                        resolve()
                    }
                });
            });
        }),
        check('password', 'Password of at least 4 characters is required').isLength({min: 4}).custom((value, {req}) => {
            if(value != req.body.confirm_password) {
                throw new Error('Passwords do not match!')
            }else {
                return value;
            }
        })
    ];
}

exports.resultsValidator = (req, res, errors) => {

    if(errors.length > 0) {
        req.session.errors = errors;
        console.log(`Errors: `, errors);
        res.json(errors);
    }
}

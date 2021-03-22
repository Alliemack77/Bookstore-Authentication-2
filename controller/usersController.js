const bcrypt = require('bcrypt');
const objectID = require('mongodb').ObjectID;

// require Model
const {UserModel} = require('../models/userModel');


// Handlers
// /users
const getUsers = async (req, res) => {
    await UserModel.find({}).then(docs => {
        res.json(docs);
    }).catch(err => {
        res.json(err);
    });
}

// /users/new
const addUser = (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err) {
            return res.status(500).json({error: err});
        }else {
            const user = new UserModel({
                fname: req.body.fname, 
                lname: req.body.lname, 
                email: req.body.email, 
                password: hash
            });
        
            const newAddress = {
                city: req.body.city,
                street: req.body.street
            }
        
            user.address.push(newAddress);
        
            user.save().then(() => {
                console.log(`You added: ${user}`);
                res.send(user);
            }).catch(err => {
                res.json(err);
            });
        }
    });
}


// /users/:id
const findUser = (req, res) => {
    const id = req.params.id;
    const filter = {"_id": objectID(id)};

    UserModel.findById(filter, (err, doc) => {
        if(err) {
            res.json(err);
        }else {
            console.log(doc);
            res.send(`Your user is ${doc}`);
        };
    });
}

const updateUser = (req, res) => {
    const id = req.params.id;
    const filter = {"_id": objectID(id)};

    UserModel.findById(filter, (err, doc) => {
        if(err) {
            res.json(err);
        }else {
            UserModel.updateOne(filter, {
                fname: req.body.fname || doc.fname,
                lname: req.body.lname || doc.lname,
                email: req.body.email || doc.email,
                password: req.body.password || doc.password
            }, (err, doc) => {
                if(err) {
                    res.json(err);
                }else {
                    console.log(doc);
                    res.json({success: "OK"});
                };
            });
        };
    });
}

const deleteUser = (req, res) => {
    const id = req.params.id;
    const filter = {"_id": objectID(id)};

    UserModel.deleteOne(filter, (err) => {
        if(err) {
            res.json(err);
        }else {
            console.log('Your user was deleted');
            res.json({success: "OK"});
        };
    });
}



exports.getUsers = getUsers;
exports.addUser = addUser;
exports.findUser = findUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
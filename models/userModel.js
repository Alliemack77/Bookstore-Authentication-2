const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({
    street: String,
    city: String 
})

const userSchema = mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    password: String,
    address: [addressSchema]
});

const UserModel = mongoose.model('User', userSchema);




module.exports = { UserModel };


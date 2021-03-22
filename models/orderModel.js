const mongoose = require('mongoose');

const Schema = mongoose.Schema


const orderSchema = new Schema({
    quantity: Number,
    price: String,  
    items: [{
        type: Schema.Types.ObjectId, 
        ref: 'book'  // tells Mongoose to use the Book model when populating
    }] 
});


const OrderModel = mongoose.model('order', orderSchema);

module.exports = OrderModel;
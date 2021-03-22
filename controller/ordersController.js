const objectID = require('mongodb').ObjectID;

// require Model
const OrderModel = require('../models/orderModel');
const BookModel = require('../models/bookModel');


// Handlers
// /orders
const getOrders = (req, res) => {
    OrderModel.find({}).then((docs) => {
        res.json(docs)
    }).catch(err => {
        res.json(err)
    });
}


// /orders/new
const addOrder = (req, res) => {

    const order = new OrderModel(req.body);

    order.save().then(()=> {
        console.log(`You added: ${order}`);
        res.send(order);
    }).catch(err => {
        res.json(err);
    });

}


// /orders/:id
const findOrder = (req, res) => {
    const id = req.params.id;
    const filter = {"_id": objectID(id)};

    OrderModel.findById(filter, (err, doc) => {
        if(err) {
            res.json(err);
        }else {
            console.log(doc);
            res.send(`Your order of ${doc.quantity} ${doc.item}(s) at $${doc.price} per ${doc.item} was placed.`);
        };
    });
}

const updateOrder = (req, res) => {
   const id = req.params.id;
   const filter = {"_id": objectID(id)};

    OrderModel.findById(filter, (err, doc) => {
        if(err) {
            res.json(err);
        }else {
            OrderModel.updateOne(filter, {
                items: [...doc.items, req.body.items],
                price: req.body.price || doc.price,
                quantity: req.body.quantity || doc.quantity
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

    OrderModel.findOne(filter).populate('items').exec((err, item) => { //can use .then() instead of .exec
        console.log("ITEM.ITEMS: ", item.items);
    })

}

const deleteOrder = (req, res) => {
    const id = req.params.id;
    const filter = {"_id": objectID(id)};

    OrderModel.deleteOne(filter, (err) => {
        if(err) {
            res.json(err);
        }else {
            console.log('Your book was deleted');
            res.json({success: "OK"});
        };
    });
}

exports.getOrders = getOrders;
exports.addOrder = addOrder;
exports.findOrder = findOrder;
exports.updateOrder = updateOrder;
exports.deleteOrder = deleteOrder;





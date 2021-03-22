const objectID = require('mongodb').ObjectID;

// require model
const BookModel = require('../models/bookModel');


// Handlers
// /books
const getBooks = async (req, res) => {
    await BookModel.find({}).then((docs) => {
       res.json(docs);
    }).catch(err => {
        res.json(err);
    });  
}



// /books/new
const addBooks = (req, res) => {
    const books = req.body;
    
    const newBook = {
        title: books.title,
        author: books.author
    }

    // define the doc - an instance of the BookModel model 
    const book = new BookModel(newBook);

    // save to DB
    book.save().then(() => {
        console.log(`You added: ${book}`);
        res.send(book);
    }).catch((err) => {
        res.json(err);
    });
}


// /books/:id
const showBook = (req, res) => {
    const id = req.params.id;
    console.log(id);
    const filter = {"_id": objectID(id)};

    BookModel.findById(filter, (err, doc) => {
        if(err) {
            res.json(err);
        }else {
            console.log(doc.title, "by", doc.author);
            res.send(`Your Book is ${doc.title} by ${doc.author}`);
        }
    });
}


const updateBook = (req, res) => {
    const id = req.params.id;
    const filter = {"_id": objectID(id)};

    BookModel.findById(filter, (err, doc) => {
        if(err) {
            res.json(err);
        }else {
            BookModel.updateOne(filter, {
                title: req.body.title || doc.title,
                author: req.body.author || doc.author
            }, (err, doc) => {
                if(err) {
                    res.json(err)
                }else{
                    console.log(doc);
                    res.json({success: "OK"})
                }
            });
        };
    });    
}


const deleteBook = (req, res) => {
    const id = req.params.id;
    const filter = {"_id": objectID(id)};

    BookModel.deleteOne(filter, (err) => {
        if(err) {
            res.json(err);
        }else {
            console.log('Your book was deleted');
            res.json({success: "OK"});
        }
    });

}

exports.getBooks = getBooks;
exports.addBooks = addBooks;
exports.showBook = showBook;
exports.updateBook = updateBook;
exports.deleteBook = deleteBook;

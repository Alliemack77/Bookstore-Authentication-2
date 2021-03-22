const express = require('express');
const router = express.Router();

// import controller functs
const controller = require('../controller/booksController');

// Routes
// /books
router.get('/', (req, res) => {
    controller.getBooks(req, res)
});


// /books/new
router.post('/new', (req, res) => {
    controller.addBooks(req, res)

});


// books/:id
router.get('/:id', (req, res) => {
    controller.showBook(req, res);
});

router.put('/:id', (req, res) => {
    controller.updateBook(req, res);
});

router.delete('/:id', (req, res) => {
    controller.deleteBook(req, res);
});




module.exports = router;



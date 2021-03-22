const express = require('express');
const session = require('express-session');
const app = express();
const port = process.env.PORT || 3000;
const hostName = '127.0.0.1';
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/bookstoreDB', {
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true
});

// mongoose.connection.on('error', console.error);
// mongoose.connection.on('open', function(){
//     console.log('Database connection extablished ... banana');
// });


app.use(express.urlencoded({extended: true}));
app.use(session({secret: "secrets", saveUninitialized: false, resave: false}));
app.use(express.static(__dirname + "/public"));

// set CORS
// const setCors = require('./middleware/security');
// app.use((req, res, next) => {
//     setCors(req, res);
//     next();
// });
  

// import routes
const booksRouter = require('./routes/books');
const usersRouter = require('./routes/users');
const ordersRouter = require('./routes/orders');
app.use('/books', booksRouter);
app.use('/users', usersRouter);
app.use('/orders', ordersRouter);


// Home Route
app.get('/', (req, res) => {
    res.sendFile('index.html');
});


app.listen(port, hostName, () => console.log(`Listening at: ${hostName}:${port}`) )
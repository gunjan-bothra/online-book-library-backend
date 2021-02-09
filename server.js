const express = require('express');
const app = express();
let bookList = require('./data/bookList.json');

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(express.json());

//Get list of books in library
app.get('/bookList', function (req, res) {
    res.send(bookList);
});

// Add book in the library
app.post('/bookList', (req, res) => {
    let bookId = Math.random(new Date());
    let book = {
        "bookId": bookId,
        "name": req.body.name,
        "author": req.body.author,
        "rating": req.body.rating
    };
    bookList.list.push(book);   
    res.send('success');
});

// Update book details in the library book list
app.put('/bookList/:id', (req, res) => {
    let list = bookList.list;
    for (var i = 0; i < list.length; i++) {
        if (list[i].bookId == req.params.id) {
            list.splice(i, 1, req.body);
        }
      } 
    res.send('success');
});

app.listen(3001, function () {
    console.log('listening on 3001')
});
var express = require('express');
var todoController = require('./controllers/todoController');
var session = require('express-session');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);
var app = express();

app.set('view engine', 'ejs');
app.use(express.static('./public'));

// localhost:3000/assets/style.css

app.use(session({
    secret: 'Thisismytestkey',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));

todoController(app);

app.listen(3000);
console.log('you are listening to port 3000');
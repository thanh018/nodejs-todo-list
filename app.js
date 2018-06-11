var express = require('express');
var todoController = require('./controllers/todoController');

var app = express();

app.set('view engine', 'ejs');
app.use(express.static('./public'));

// localhost:3000/assets/style.css

todoController(app);

app.listen(3000);
console.log('you are listening to port 3000');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// mongoose.connect('mongodb://test:test1234@ds259001.mlab.com:59001/little2');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/todo', { useNewUrlParser: true });


var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);
// var itemOne = Todo({item: 'buy flower'}).save(function(err){
//     if (err) throw err
//     console.log('save item');
// });

// var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'coding'}];

var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app) {
    app.get('/todo', function(req, res) {
        Todo.find({}, function(err, data) {
            if(err) throw err;
            res.render('todo', {todos: data});
        })
    });

    app.post('/todo', urlencodedParser, function(req, res) {
        var newTodo = Todo(req.body).save(function(err, data) {
            if(err) throw err;
            res.json(data);
        });
        console.log(req.body);
        // data.push(req.body);
        // res.json(data);
    });

    app.delete('/todo/:item', function(req, res) {
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
            if(err) throw err;
            res.json(data);
        });
    });
};




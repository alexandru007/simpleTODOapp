var express = require('express');
var session = require('cookie-session');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var app = express();

/* cookie-session to save the list using cookies */
app.use(session({
    name: "sessionName",
    secret: 'someSecretString'
}));

/* home page */
app.get('/', function(req, res) { 

    // check if list doesn't exist, create one
    if (typeof(req.session.todolist) == 'undefined') {
        req.session.todolist = [];
    }

    res.render('todo.ejs', {myarray: req.session.todolist});
});

/* add an item to the list */
app.post('/add', urlencodedParser, function(req, res) {

    if (req.body.newitem != '') {
        req.session.todolist.push(req.body.newitem);
    }

    res.redirect('/');
});

/* remove an item*/
app.get('/delete/:id', function(req, res) {
    if (req.params.id != '') {
        req.session.todolist.splice(req.params.id, 1);
    }
    res.redirect('/');
});

/* redirect to home */
app.get('*', function(req, res){
    res.redirect('/');
});

app.listen(3000, function(){
    console.log("Listen on port: " + 3000);
});
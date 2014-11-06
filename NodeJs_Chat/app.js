/*
	Requires
*/
var express = require('express');
var app = express();
var server = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(server);

/*
	Routes
*/
var index = require('./routes/index');
var messages = require('./routes/messages');

/*
	Settings
*/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

/*
	Views
*/
app.use('/', index);
app.use('/messages', messages);

/*
	Error handlers
*/
//Development
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

//Production
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
/*
	Listening
*/
server.listen(3000);

exports.io = io;
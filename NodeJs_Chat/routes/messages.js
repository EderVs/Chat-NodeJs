var app = require('express.io')();
var async = require('async');
var io;
var module_app;

/*
	Sockets
*/
async.waterfall([
	function (callback)
	{
		module_app = require('../app');
		callback(null, module_app);
	},
	function sockets(module_app, callback)
	{
		io = module_app.io;
		console.log('Holass');
		io.on('connection', function (socket)
		{
			socket.on('send_message', function (data)
			{
				console.log(data.username + ' : ' + data.message);
				socket.emit('chat message', {
					username : data.username,
					message : data.message 
				});
				socket.broadcast.emit('chat message', {
					username : data.username,
					message : data.message 
				});
			});
			socket.emit('some event', { for: 'everyone' });
		});
	}], function (err, result)
		{
			console.log(err);
		});

/*
	Routes
*/

app.get('/', function (req, res)
{
	console.log('GET /messages');
	
	var username = req.param('Username');
	res.render('messages', {username : username});
});

module.exports = app;
app = require('express.io')();

app.get('/', function (req, res){
	console.log('GET /')
	res.render('index');
});

module.exports = app
var express = require('express'), app = express();

var bodyParser = require('body-parser');

var http = require("http");


var unirest = require('unirest')

var HOST  = 'localhost';
var PORT = 8000;


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Path to our public directory
var pub = __dirname + '/build';

app.use("/", express.static(pub));
app.use('/static',express.static(__dirname + '/static'));
app.use('/static/css',express.static(__dirname + '/static/css'));
app.use('/static/js',express.static(__dirname + '/static/js'));

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
	
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Cache-Control', 'no-cache');

    // Pass to next layer of middleware
    next();
});

//--------------------------------------------------------------------------------------------------------------------------------

function getREST(route) {

	app.get(route, function(req, res) { 

		// GET a resource
		unirest.get('http://'+HOST+':'+PORT+route)
		  .query(req.query)
		  .end(function(res2) {
			if (res2.error) {
			  console.log('Error: ', res2.error)
			  
			  res.send('{"msg": "Error: problem with request: '+res2.error+'"}');
			} else {
			  res.send(res2.body);
			}
		  });
		
	});	
}

function postREST(route) {
	
	app.post(route, function(req, res) { 

		// POST a form with an attached file
		unirest.post('http://'+HOST+':'+PORT+route)
		  .query(req.body)
		  .end(function(res2) {
			if (res.error) {
			  console.log('Error: ', res2.error)
			  
			  res.send('{"msg": "Error: problem with request: '+res2.error+'"}');
			} else {
			  res.send(res2.body);
			}
		  });
  
	});	
  
}
//--------------------------------------------------------------------------------------------------------------------------------

getREST('/api/notes');
getREST('/api/notes/tag');
getREST('/api/tags');
getREST('/api/notes/one');

postREST('/api/notes/new');
postREST('/api/notes/post');


app.listen(3000);
console.log('Listening on port 3000');



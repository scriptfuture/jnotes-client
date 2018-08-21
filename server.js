var express = require('express'), app = express();

var bodyParser = require('body-parser');

var http = require("http");


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

app.get('/api/notes', function(req, resx) { 
	   
	var options = {
	  host: 'localhost',
	  port: 8000,
	  //path: '/upload',
	 // method: 'POST'
	 
	  path: '/api/notes',
	  method: 'GET'
	};

	var req = http.request(options, function(res) {
	  console.log('STATUS: ' + res.statusCode);
	  console.log('HEADERS: ' + JSON.stringify(res.headers));
	  res.setEncoding('utf8');
	  res.on('data', function (chunk) {
		//console.log('BODY: ' + chunk);
		
		 resx.send(chunk);
		
		
	  });
	});

	req.on('error', function(e) {
	  console.log('problem with request: ' + e.message);
	});

	// write data to request body
	req.write('data\n');
	req.write('data\n');
	req.end();
			
 });

app.listen(3000);
console.log('Listening on port 3000');



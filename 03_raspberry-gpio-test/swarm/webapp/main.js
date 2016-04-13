var express = require("express");
var path = require("path");

var app = express();

app.use(express.static(path.join(__dirname, "src")));

var server = app.listen(8080, function() {
	console.log('Listening on port %d', server.address().port);
});

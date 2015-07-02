var http = require("http");
var fs = require("fs");
var static = require("node-static");
var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.use("/", function(req, res, next) {
	if (req.path == "/save") {
		next();
	} else {
		res.sendFile(__dirname + req.path, function(err) {
			if (err) {
				console.log("Error occured");
			} else {
				console.log("All good");
			}
		})
	}
});

app.use(bodyParser());

app.use("/save", function(req, res, next) {
	var data = req.body;
	fs.writeFile("app/words/words.json", JSON.stringify(data, formatingData, 2), function(err) {
		if (err) {
			console.log("Error occur at write operation");
		}
		else {
			console.log("file successfully created");
		}
	});
});


app.listen(3030, function() {
	console.log("Server running on 3030");
});


function formatingData(key, value) {
	return value.map(function(v) {
		return v.toLowerCase();
	});
}
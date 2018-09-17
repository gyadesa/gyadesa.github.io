// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var logger = require("morgan");
var mongoose = require("mongoose");
//var Promise = require("bluebird");

var PORT = process.env.PORT || 3000;
var app = express();

process.env.MONGODB_URI = 'production';

// Models
var comments = require("./models/comments.js");
var news = require("./models/news.js");
var users = require("./models/users.js");

// Static directory
app.use(express.static("public"));

// Creating the Handlebars View Engine
//======================================
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));

// Database configuration with mongoose, errors, success
mongoose.Promise = Promise;
if (process.env.MONGODB_URI === 'production') {
    console.log('node env is', process.env.MONGODB_URI);
    mongoose.connect('mongodb://gyadesauser:mymongo85db@ds057862.mlab.com:57862/gygoogledb_scraper');
} else {
    console.log('node env is', process.env.MONGODB_URI);
    mongoose.connect('mongodb://localhost/bbcnews-scraper');
}
var db = mongoose.connection;
db.on("error", function(error) { console.log("Mongoose Error: ", error); });
db.once("open", function() { console.log("Mongoose connection successful."); });

// Controllers
var routes = require("./controllers/controller.js");
app.use("/", routes);

app.listen(PORT, function() {
    console.log('Running on port: ' + PORT);
});
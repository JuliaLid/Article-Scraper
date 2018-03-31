var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
var exphbs = require("express-handlebars");
var db = require("./models");

var PORT = 3000;

var app = express();

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// require("./routes/index.js")(app);
// require("./routes/user-api-routes.js")(app);

// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
// mongoose.Promise = Promise;

// mongoose.connect(MONGODB_URI, {
//     useMongoClient: true
//   });
  

  app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
  
//replace router with app and then call the fetch controller to get all records from the db
var axios = require("axios");
var db = require("../../models");
var Headline = require("../../models/Headline.js");

module.exports = function(app){
  app.get("/", function(req, res) {
    
      Headline.find().sort({_id: -1})
      //send to handlebars
      .exec(function(err, doc) {
          if(err){
              console.log(err);
          } else{
         
            var hbsArticleObject = {
              articles: doc
          };

          console.log(hbsArticleObject);
          
          res.render("home", hbsArticleObject);
          }
    });
  });

  app.get("/scrape", function(req, res) {
    // First, we grab the body of the html with request
    axios.get("https://www.nytimes.com/spotlight/royal-wedding").then(function(response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);
  
      // Now, we grab every h2 within an article tag, and do the following:
      $(".stream li").each(function(i, element) {
        // Save an empty result object
        var result = {};
      
        result.title = $(this).find("h2").text();
        result.summary = $(this).find("p").text();
        result.link = $(this).find("a").attr("href");
        // console.log(result)
        // Create a new Article using the `result` object built from scraping
        db.Headline.create(result)
          .then(function(dbHeadline) {
            // View the added result in the console
            console.log(dbHeadline);
          })
          .catch(function(err) {
            // If an error occurred, send it to the client
            return res.json(err);
          });
      });
  
      // If we were able to successfully scrape and save an Article, send a message to the client
    //   res.send("Scrape Complete");
      var hbsArticleObject = {
        articles: dbHeadline
    };

    res.render("home", hbsArticleObject);
    });
  });






};  
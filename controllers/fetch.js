//fix router to app
var db = require("./models");

exports.scrapeHeadlines = function(req,res){
    
}
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
            articles: scrapedArticles
        };
    
        res.render("home", hbsArticleObject);
        });
      });
    


      
// app.get("/scrape", function(req, res) {
//     // First, we grab the body of the html with request
//     axios.get("https://www.nytimes.com/spotlight/royal-wedding").then(function(response) {
//       // Then, we load that into cheerio and save it to $ for a shorthand selector
//       var $ = cheerio.load(response.data);
  
//       // Now, we grab every h2 within an article tag, and do the following:
//       $(".stream li").each(function(i, element) {
//         // Save an empty result object
//         var result = {};
      
//         result.title = $(this).find("h2").text();
//         result.summary = $(this).find("p").text();
//         result.link = $(this).find("a").attr("href");
//         // console.log(result)
//         // Create a new Article using the `result` object built from scraping
//         db.Headline.create(result)
//           .then(function(dbHeadline) {
//             // View the added result in the console
//             console.log(dbHeadline);
//           })
//           .catch(function(err) {
//             // If an error occurred, send it to the client
//             return res.json(err);
//           });
//       });
  
//       // If we were able to successfully scrape and save an Article, send a message to the client
//     //   res.send("Scrape Complete");
//       var hbsArticleObject = {
//         articles: scrapedArticles
//     };

//     res.render("home", hbsArticleObject);
//     });
//   });


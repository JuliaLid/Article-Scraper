//replace router with app and then call the fetch controller to get all records from the db
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../../models");
var Headline = require("../../models/Headline.js");
var scrape = require('../../scripts/scrape.js');

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


          res.render("home", hbsArticleObject);
          }
    });
  });

  app.get("/scrape", function(req, res) {
    axios.get("https://www.nytimes.com/spotlight/royal-wedding").then(function(response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);
      var titlesArray = [];
  
      $(".stream li").each(function(i, element) {
        // Save an empty result object
			var result = {};
		
			result.title = $(this).find("h2").text();
			result.summary = $(this).find("p").text();
			result.link = $(this).find("a").attr("href");
        	   
	
			if(result.title !== "" && result.link !== "" && result.summary !==""){
				if(titlesArray.indexOf(result.title) == -1){
				// push the saved title to the array 
					titlesArray.push(result.title);

					// only add the article if is not already there
					Headline.count({ title: result.title}, function (err, test){
							//if the test is 0, the entry is unique and good to save
						if(test == 0){

						//using Article model, create new object
							var entry = new Headline (result);

						//save entry to mongodb
							entry.save(function(err, doc) {
								if (err) {
									console.log(err);
								} else {
									console.log(doc);
								}
							});
						}
					});
				}
		// Log that scrape is working, just the content was missing parts
			else{
			console.log('Article already exists.')
			}
				
			} else {
					console.log("Missing data")
			}
		});
           res.redirect('/');
      });
  });

  app.post("/save/:id", function(req, res) {
	Headline.findById(req.params.id, function(err, data) {
		if (data.issaved) {
			Headline.findByIdAndUpdate(req.params.id, {$set: {issaved: false, status: "Save Article"}}, {new: true}, function(err, data) {
				
				res.redirect("/");
			});
		}
		else {
			Headline.findByIdAndUpdate(req.params.id, {$set: {issaved: true, status: "Saved"}}, {new: true}, function(err, data) {
				console.log("Saved");
				res.redirect("/saved");
			});
		}
	});
});

app.get("/saved", function(req, res) {
	Headline.find({issaved: true}, null, {sort: {created: -1}}, function(err, data) {
		if(data.length === 0) {
			// res.render("placeholder", {message: "You have not saved any articles yet. Try to save some delicious news by simply clicking \"Save Article\"!"});
			console.log('There are no saved articles');
		}
		else {
			// res.render("saved", {saved: data});
			var hbsArticleObject = {
				articles: data
			};
  
  
			res.render("saved", hbsArticleObject);
		}
	});
});



};  
//Dependencies
var HeadlineController = require("../../controllers/headline.js");
var ScrapeController = require("../../controllers/fetch.js");
var NotesController = require("../../controllers/note.js");
var Note = require("../../models/Note.js");
var Headline = require("../../models/Headline.js");
var axios = require("axios");
var cheerio = require("cheerio");
var scrape = require('../../scripts/scrape.js');

module.exports = function(app){
	//get all articles 	
  	app.get("/", function(req, res) {
		HeadlineController.renderUnsavedArticles(function(data){
			// console.log("Unsaved articles ",data);
			var hbsArticleObject = {
						articles: data
				};
				res.render("home", hbsArticleObject);
		});
 	});

	 //save article
 	 app.post("/save/:id", function(req, res) {
		HeadlineController.saveArticle(req);	
		res.send('success');
	});

	app.get("/saved", function(req, res) {

		HeadlineController.renderSavedArticles(function(data){
			console.log("Saved articles",data);
			
			if(data.length === 0) {
				// res.render("saved", {message: "You have not saved any articles yet. Try to save some delicious news by simply clicking \"Save Article\"!"});
				console.log('There are no saved articles');
			} else {
				var hbsArticleObject = {
						articles: data
				};
				res.render("saved", hbsArticleObject);
			}
		});
	});
	
	//delete article
	app.post("/delete/:id", function(req, res) {
		HeadlineController.deleteArticle(req);	
		res.send('success');
	});

	//get notes when modal is clicked 	
	app.get("/articles/:id", function(req, res) {
		NotesController.getAllNotes(req,function(data){
		res.json(data);
		});
	});

	  // create a new note or replace an existing note
	app.post("/articles/:id", function(req, res) {
		NotesController.postNotes(req);
		res.send('Successfully saved note');
	});

	//delete note
	app.get("/notes/:id", function(req, res) {
		NotesController.deleteNotes(req, function(data){
			res.json(data);
		});
	});


	//Fail - I couldn't get the home page to reload once the scrape was done BUT I'm very close
	//===========================
	// app.get("/scrape", function(req, res) {
	// 	ScrapeController.scrapeHeadlines(function(data){
	// 	 	res.json(data);
	// 		// res.redirect('/');
	// 	});
	// });

	//Scrape articles 
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
};  
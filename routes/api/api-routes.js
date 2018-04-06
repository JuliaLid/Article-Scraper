//replace router with app and then call the fetch controller to get all records from the db
var HeadlineController = require("../../controllers/headline.js");
var ScrapeController = require("../../controllers/fetch.js");
var NotesController = require("../../controllers/note.js");
var Note = require("../../models/Note.js");
var scrape = require('../../scripts/scrape.js');

module.exports = function(app){
  	app.get("/", function(req, res) {
		HeadlineController.renderUnsavedArticles(function(data){
			// console.log("Unsaved articles ",data);
			var hbsArticleObject = {
						articles: data
				};
				res.render("home", hbsArticleObject);
		});
 	});

	app.get("/scrape", function(req, res) {
		ScrapeController.scrapeHeadlines();	
		res.send('success');
			// res.redirect('/');
	});


 	 app.post("/save/:id", function(req, res) {
		HeadlineController.saveArticle(req);	
		res.send('success');
	});

	app.get("/saved", function(req, res) {

		HeadlineController.renderSavedArticles(function(data){
			console.log("Saved articles",data);
			
			if(data.length === 0) {
				// res.render("placeholder", {message: "You have not saved any articles yet. Try to save some delicious news by simply clicking \"Save Article\"!"});
				console.log('There are no saved articles');
			} else {
				var hbsArticleObject = {
						articles: data
				};
				res.render("saved", hbsArticleObject);
			}
		});
	});

	app.post("/delete/:id", function(req, res) {
		HeadlineController.deleteArticle(req);	
		res.send('success');
	});

	//Get notes when modal is clicked 	
	app.get("/articles/:id", function(req, res) {
		NotesController.getAllNotes(req,function(data){
		res.json(data);
		});
	});

	  // Create a new note or replace an existing note
	app.post("/articles/:id", function(req, res) {
		NotesController.postNotes(req);
		res.send('success');
	});

	app.get("/notes/:id", function(req, res) {

		console.log("Note ID ", req.params.id);
	  
		console.log("Able to activate delete function.");
	  
		Note.findOneAndRemove({"_id": req.params.id}, function (err, doc) {
		  if (err) {
			console.log("Not able to delete:" + err);
		  } else {
			console.log("Able to delete, Yay");
		  }
		  res.send(doc);
		});
	  });


};  
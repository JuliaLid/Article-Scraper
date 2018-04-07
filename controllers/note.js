var db = require("../models/index.js");
var Headline = require("../models/Headline.js");
var Note = require("../models/Note.js");

exports.getAllNotes = function(req,cb) {
    Headline.findOne({"_id": req.params.id})
	  
    .populate("note")
    .then(function(dbArticle) {
      // If we were able to successfully find an Article with the given id, send it back to the client
    //   console.log("line 11",dbArticle);
      cb(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
}

exports.postNotes = function(req){
    var newNote = new Note(req.body);
		// And save the new note the db
		newNote.save(function(error, doc) {
			// Log any errors
			if (error) throw error;
			// Use the article id to find it and then push note
			console.log("Note Id :", doc._id);
            
            Headline.findOneAndUpdate({ "_id": req.params.id },  {$push: {note: doc._id}}, {new: true, upsert: true})

			.populate('note')

			.exec(function (err, doc) {
				console.log("Article updated");
				if (err) {
					console.log("Cannot find article.");
                }
		});
	});
}

exports.deleteNotes = function(req,cb){
    Note.findOneAndRemove({"_id": req.params.id}, function (err, doc) {
        if (err) {
          console.log("Not able to delete:" + err);
        } else {
          console.log("Note deleted");
          cb(doc);
        }
       
      });
    
}

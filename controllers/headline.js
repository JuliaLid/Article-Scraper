var Note = require("../models/Note.js");
var Headline = require("../models/Headline.js");

exports.renderUnsavedArticles = function(cb) {
    Headline.find({issaved:false}).sort({_id: -1})
    //send to handlebars
    .exec(function(err, doc) {
        if(err){
            console.log(err);
        } else{
            cb(doc);
        }
  });
}

exports.saveArticle = function(req){
    	
    Headline.findByIdAndUpdate(req.params.id, {$set: {issaved: true, status: "Saved"}}, {new: true}, function(err, data) {
        if(err){
            console.log(err);
            } else {
                console.log("Article is saved")
            }
    });
};


exports.renderSavedArticles = function(cb){
    Headline.find({issaved: true}).sort({created: -1})
    
    .exec(function(err, doc) {
        if(err){
            console.log(err);
        } else{
            cb(doc);
        }
  });
}

exports.deleteArticle = function(req){

    Headline.remove({"_id": req.params.id}, function(err, data) {
        if (err) {
            console.log("Not able to delete:" + err);
          } else {
            console.log("Article deleted");
          }
    });
}
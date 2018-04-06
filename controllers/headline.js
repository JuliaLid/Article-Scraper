var Note = require("../models/Note.js");
var Headline = require("../models/Headline.js");

exports.findAllUnsaved = function(cb) {
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
            

}
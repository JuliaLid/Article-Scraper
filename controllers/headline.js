var Headline = require("../models/Headline.js");

module.exports = function(app){
app.get('/', function(req, res) {
    //allows newer articles to be on top
    Headline.find().sort({_id: -1})
        //send to handlebars
        .exec(function(err, doc) {
            if(err){
                console.log(err);
            } else{
                //name needs to match what's in the handlebars - ,JL
                var hbsArticleObject = {
                    articles: doc
                };
                res.render('index',hbsArticleObject);
            }
    });
});

}
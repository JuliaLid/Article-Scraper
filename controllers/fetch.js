//Dep
var db = require("../models/index.js");
var Headline = require("../models/Headline.js");
var axios = require("axios");
var cheerio = require("cheerio");

exports.scrapeHeadlines = function(cb){
        axios.get("https://www.nytimes.com/spotlight/royal-wedding")
        
        .then(function(response) {

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
                          console.log("line 41",doc);
                          cb(doc);
                        }
                      });
                    }
                  });
                } else{
                    console.log('Article already exists.')
                 }
              } else {
                  console.log("Missing data")
              }
              // cb(doc);
            });
              
          });
};
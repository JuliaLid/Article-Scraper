//where does it get called from?
var axios = require("axios");
var cheerio = require("cheerio");

var scrape = function (url,cb){
    if (url === "https://www.nytimes.com/spotlight/royal-wedding") {
        axios.get(url).then(function(response) {
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            var $ = cheerio.load(response.data);
            var result = {};
          
            $(".stream li").each(function(i, element) {
                
                var title = $(this).find("h2").text();
                var summary = $(this).find("p").text();
                var link = $(this).find("a").attr("href");
                
                if(link !== "" && title !== "" && summary !==""){
                    result.title = title;
                    result.summary = summary;
                    result.link = link;
                }
        });
            // console.log(result);
            cb(result);
        });
    };
};

module.exports = scrape;
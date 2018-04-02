$(document).ready(function() {
    //Make a    aler call to API-Routes to fetch all headlines from the database
    $.get("/", function(data) {
        // console.log(data);
      });

   
      $("#search-button").on("click", function() {
        // Grab the id associated with the article from the submit button
        // var thisId = $(this).attr("data-id");
        console.log("I'm clicked");
        // Run a POST request to change the note, using what's entered in the inputs
        $.ajax({
          method: "GET",
          url: "/scrape",
        })
    });

    $(".btn-default").on("click", function() {
        // Grab the id associated with the article from the submit button
        var thisId = $(this).attr("data-id");
        console.log("Saving article");
        console.log(thisId);
        // Run a POST request to change the note, using what's entered in the inputs
        $.ajax({
          method: "POST",
          url: "/save/" + thisId
        })
    });


});
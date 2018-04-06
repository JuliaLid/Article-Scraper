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
        .done(function(data) {
            console.log(data);
            window.location.href = "/";
        });
    });

    $(document).on("click","#save-article", function() {
        // Grab the id associated with the article from the submit button
        var thisId = $(this).attr("data-id");
        console.log("Saving article");
        console.log(thisId);
        // Run a POST request to change the note, using what's entered in the inputs
        $.ajax({
          method: "POST",
          url: "/save/" + thisId
        })
        .done(function(data) {
            console.log(data);
            window.location.href = "/";
        });
       
        
    });

    $(".delete-article button").on("click", function() {
        // Grab the id associated with the article from the submit button
        var thisId = $(this).attr("data-id");
        console.log("Deleting article");
        console.log(thisId);
        // Run a POST request to change the note, using what's entered in the inputs
        $.ajax({
          method: "POST",
          url: "/delete/" + thisId
        })
        location.reload(); //is there a better way?
    });

    $(document).on("click","#modalbutton", function() {
        console.log("Modal button is clicked");
        // Empty the notes from the note section
        $("#note-text").empty();
        // Save the id from the button tag
        var thisId = $(this).attr("data-id");
        
        // $("#articleID").text(thisId);
      
        // Now make an ajax call for the Article
        $.ajax({
          method: "GET",
          url: "/articles/" + thisId
        })
          // With that done, add the note information to the page
          .done(function(data) {
            console.log(data);
           

            $("#note-text").append("<p id='actualnotes'></p>");
            if (data.note) {
              $("#actualnotes").append("<ul id='notelist'>");

                for (var i = 0; i < data.note.length; i++) {
                  $('#notelist').append("<li id='" + data.note[i]._id + "'>" + data.note[i].body + " " +
                  "<button data-id='" + data.note[i]._id +
                  "' id='deletenote'>X</button></li>");
                }
                
              $('#actualnotes').append("</ul>");
            } else {
              $('#actualnotes').text("There aren't any notes yet.");
            }
            // A textarea to add a new note body
            var textAreaDiv = $('<div class = "form-group>');
            var textAreaLabel = $('<label for="message-text" class="col-form-label">Add a Note for <strong>' + data.title+'</strong></label>');
            var textArea = $('<textarea class="form-control" rows="10" id="message-text"></textarea>');

            var modalFooter = $('<div class = "modal-footer>');
            var modalSaveButton = $('<button type="submit" class="btn btn-primary float-left" data-id='+ data._id + ' id="savenote">Save Note</button>');

            var modalFooterDiv = $(modalSaveButton).appendTo(modalFooter);
            // textAreaDiv.append(textAreaLabel).append(textArea).append(modalFooter).append(modalSaveButton);
           textAreaLabel.append(textArea);

            $("#note-text").append(textAreaLabel);
            $(".modal-footer").append(modalSaveButton);

            // $("#note-text").append("<textarea id='bodyinput' name='body'></textarea>");
            // // A button to submit a new note, with the id of the article saved to it
            // $("#notes-text").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
          });
        
      });

    $(document).on("click", "#savenote", function() {
        // Grab the id associated with the article from the submit button
       console.log("Saving note");
       
        var thisId = $(this).attr("data-id");
        // Run a POST request to change the note, using what's entered in the inputs
        
        $.ajax({
          method: "POST",
          url: "/articles/" + thisId,
          data: {
            // Value taken from note textarea
            body: $("#message-text").val()
          }
        })
         .done(function(data) {
            console.log(data);
            $("#message-text").val("");
            $(".modal-footer").empty();
            $('#myModal').modal('hide')
          });
        // Also, remove the values entered in the input and textarea for note entry
       
      });

      $(document).on("click", "#deletenote", function() {
        // Grab the id associated with the note
        var thisId = $(this).attr("data-id");
        // Run a POST request to delete the note
        $.ajax({
          method: "GET",
          url: "/notes/" + thisId,
        })
          // With that done
          .done(function(data) {
              console.log(data);
            $("#" + data._id).remove();
          });
      });

});
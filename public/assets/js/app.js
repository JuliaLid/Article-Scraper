$(document).ready(function() {
      //on-click event to initialize the scrape of articles 
	$("#search-button").on("click", function() {
		console.log("I'm clicked");
		
		$.ajax({
		method: "GET",
		url: "/scrape",
		})
		.done(function(data) {
			console.log(data);
       window.location.href = "/";
    
    });
 
	});

		//on-click event to save an article on the home page 
    $(document).on("click","#save-article", function() {
        // Grab the id associated with the article from the submit button
        var thisId = $(this).attr("data-id");
		   
		    console.log("Saving article");
        console.log(thisId);
     
        $.ajax({
          method: "POST",
          url: "/save/" + thisId
        })
        .done(function(data) {
            console.log(data);
            window.location.href = "/";
        });
    });

	//on-click event to delete an article on the Saved page
    $(document).on("click","#delete-article", function() {
        
		var thisId = $(this).attr("data-id");
		 // Grab the id associated with the article from the submit button
        console.log("Deleting article");
        console.log(thisId);
        
        $.ajax({
          method: "POST",
          url: "/delete/" + thisId
        });
		window.location.href = "/saved";
    });

	//modal to save a note and generate exisiting notes
    $(document).on("click","#modalbutton", function() {
        console.log("Modal button is clicked");
        // Empty the notes from the note section and remove dynamically generated Save note button
        $("#note-text").empty();
        $("#savenote").remove();
        // Save the id from the button tag
        var thisId = $(this).attr("data-id");
        $.ajax({
          method: "GET",
          url: "/articles/" + thisId
        })
          // With that done, add the note information to the page dynamically
          .done(function(data) {
            console.log(data);
	        $("#note-text").append("<p id='actualnotes'></p>");
	
			if (data.note) {
              $("#actualnotes").append("<ul id='notelist'>");

                for (var i = 0; i < data.note.length; i++) {
                  $('#notelist').append("<li id='" + data.note[i]._id + "'>" + data.note[i].body + " " +
                  "<button class='float-right' data-id='" + data.note[i]._id +
                  "' id='deletenote'>X</button></li><hr>");
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
         	  textAreaLabel.append(textArea);

            $("#note-text").append(textAreaLabel);
            $(".modal-footer").append(modalSaveButton);
        });
     });

	 //on-click to save a note
    $(document).on("click", "#savenote", function() {
        // Grab the id associated with the article from the submit button
      	 console.log("Saving note");
       
        var thisId = $(this).attr("data-id");
        
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
    });

	//on-click to delete a note
	$(document).on("click", "#deletenote", function() {
	// Grab the id associated with the note
	var thisId = $(this).attr("data-id");
	// Run a POST request to delete the note
	$.ajax({
		method: "GET",
		url: "/notes/" + thisId,
	})
		.done(function(data) {
			console.log(data);
		$("#" + data._id).remove();
		$("hr").remove();
		});
	});
});
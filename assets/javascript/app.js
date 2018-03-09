$(document).ready(function () {
    var topics = ["Nunchucks", "Sniper Rifle", "Handgun", "SMG", "Crossbow", "Trebuchet", "Slingshot", "Claymore", "Morning Star", "Stun Gun"];
    
    function renderButtons() {
        $("#button-div").empty();
        $.each(topics, function(item, value) {
            var btn = $("<button>");
            btn.addClass("topic");
            btn.attr("data-topic", value);
            btn.text(value);

            $("#button-div").append(btn);
        })
    }

    $("#add-weapon").on("click", function(event) {
        event.preventDefault();

        var newWep = $("#weapon-input").val().trim();

        if ((newWep !== "") && (topics.indexOf(newWep) === -1)) {
            topics.push(newWep);
        }

        renderButtons();

        $("#weapon-input").val("");
    })

    $(document).on("click", "button", function() {

        $("#images").empty();

        var topic = $(this).attr("data-topic");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=x5M0Kz8L04y7Jg0T8K7pR5uM3WGjSYhp&limit=10&rating=pg&q=" + topic;

        $.get(queryURL).then(function(response) {

            console.log(response);

            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                if (results[i].rating !== "r") {
                    var gifDiv = $("<div class='item float-left'>");
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);
                    var wepImage = $("<img class='gif'>");

                    wepImage.attr("src", results[i].images.original_still.url);
                    wepImage.attr("data-still", results[i].images.original_still.url);
                    wepImage.attr("data-animate", results[i].images.original.url);
                    wepImage.attr("data-state", "still");
                    wepImage.attr("atr", results[i].title);


                    gifDiv.append(p);
                    gifDiv.append(wepImage);
                    $("#images").prepend(gifDiv);
                }
            }
            
        });
    });

    $(document).on("click", ".gif", function() {
        
        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    renderButtons();

});
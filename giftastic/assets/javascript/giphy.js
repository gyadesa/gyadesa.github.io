$(document).ready(function () {
    // Initial array of topics
    var topics = ["Cristino Ronaldo", "Lionel Messi", "Neymar", "Luis Suarez", "Manuel Neuer", "Robert Lewandowski", "Sergio Ramos", "Eden Hazard", "Toni Kroos", "Gonzalo Higuain"];

    function displayImg() {

        $("#display-images").empty();
        var input = $(this).attr("data-name");
        var limit = 10;
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&limit=" + limit + "&api_key=SR0PpJP2M9IhG7aQTGOQ3NEHZpr2Zad6";

        $.ajax({
            url: queryURL,
            method: "GET"
            // After the data comes back from the API
        }).then(function (response) {

            for (var i = 0; i < limit; i++) {

                var displayDiv = $("<div>");
                displayDiv.addClass("holder");

                var image = $("<img>");
                image.attr("src", response.data[i].images.original_still.url);
                image.attr("data-still", response.data[i].images.original_still.url);
                image.attr("data-animate", response.data[i].images.original.url);
                image.attr("data-state", "still");
                image.attr("class", "gif");
                displayDiv.append(image);

                var rating = response.data[i].rating;
                console.log(response);
                var pRating = $("<p>").text("Rating: " + rating);
                displayDiv.append(pRating)

                $("#display-images").append(displayDiv);
            }
        });
    }
    function renderButtons() {

        $("#display-buttons").empty();

        for (var j = 0; j < topics.length; j++) {

            var newButton = $("<button>")
            newButton.attr("class", "btn btn-default");
            newButton.attr("id", "input")
            newButton.attr("data-name", topics[j]);
            newButton.text(topics[j]);
            $("#display-buttons").append(newButton);
        }
    }

    function imageChangeState() {

        var state = $(this).attr("data-state");
        var animateImage = $(this).attr("data-animate");
        var stillImage = $(this).attr("data-still");

        if (state == "still") {
            $(this).attr("src", animateImage);
            $(this).attr("data-state", "animate");
        }

        else if (state == "animate") {
            $(this).attr("src", stillImage);
            $(this).attr("data-state", "still");
        }
    }

    $("#submitPress").on("click", function () {

        var input = $("#user-input").val().trim();
        form.reset();
        topics.push(input);

        renderButtons();

        return false;
    })

    renderButtons();

    $(document).on("click", "#input", displayImg);
    $(document).on("click", ".gif", imageChangeState);
});
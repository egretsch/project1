var butions = [];

function poster() {
    var movie = ("batman");
    // var movie = $(this).attr("data-movie");
    var movieURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

    $.ajax({
        url: movieURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var genreArray = response.Genre.split(",");
        var randomGenre = genreArray[Math.floor(Math.random() * genreArray.length)];
        var movieDiv = $("<div>");
        var movieImage = $("<img>");
        console.log(genreArray);
        console.log(randomGenre);
        movieImage.attr(
            {
                
                "data-genre": response.Genre,
                "class": "moviePoster",
                "src": response.Poster

            }
        )
        movieDiv.append(movieImage);
        $("#gifs").append(movieDiv);
    });
}
// poster();

// var musicUrl = "https://accounts.spotify.com/authorize/?"
// window.location = musicUrl + "client_id=80f8fbcd74a24b8ea1d6aab4c74ead38&response_type=token&redirect_uri=https://egretsch.github.io/project1/"
var token = "BQDjSIxgWwU6q2-gSHpftqtkXodcPyIEusURz_avrb9Q9Nw9F7-Qxdrg9hlSwCLvqR6Olx1RLqgrAiFzcK9NXN6-G5jXfRXaOp5_CQIkhBEVealmhN7iAtyibrUpGCtPWzKf-ao9VfA";

$.ajax({
    url: 'https://api.spotify.com/v1/search?q=action&type=playlist',
    method: 'GET',
    headers: {
        'Authorization': 'Bearer ' + token
    },
    success: function (data) {
        console.log(data);
    },
    error: function () {
        console.log("It failed");
    }
});
// $(document).on("click", ".gifty2", function () {

//     console.log($(this))

//     var state = $(this).attr("data-state");

//     if (state === "still") {
//         $(this).attr("src", $(this).attr("data-animate"));
//         $(this).attr("data-state", "animate");
//     } else {
//         $(this).attr("src", $(this).attr("data-still"));
//         $(this).attr("data-state", "still");
//     }
// });

// function renderButtons() {
//     $("#buttons").empty();
//     for (var i = 0; i < butions.length; i++) {
//         var a = $("<button>");
//         a.addClass("gifty");
//         a.attr("data-name", butions[i]);
//         a.text(butions[i]);
//         $("#buttons").append(a);
//     }
// }

// $("#add-button").on("click", function (event) {
//     event.preventDefault();
//     $("#button-input").empty();
//     var button2 = $("#button-input").val().trim();
//     butions.push(button2);
//     renderButtons();

// });

// $(document).on("click", ".gifty", topic);


// renderButtons();
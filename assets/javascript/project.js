var butions = [];

console.log('hello');

function moviePoster() {
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
// var currentLocation = window.location;

// console.log(currentLocation);


var token = "BQCXzHQ7Xl21AYRYCR02dXAVyximrBfZWNH-J0fhhd2AUoAzUKCtSpmjABssebCu_LB6q2_1JnIGGMzbUIDAhFYAmHGACKtkDiEV6tbIt2lXnYBNypQAJiqFekDJvLecUWFmaNp3Ob8";
function musicPlaylist() {
    var music = $(this).attr("data-music");
    var musicUrl = 'https://api.spotify.com/v1/search?q=action&type=playlist'
   $.ajax({
    url: musicUrl,
    method: 'GET',
    headers: {
        'Authorization': 'Bearer ' + token
    },      
    success: function (playlist) {
        console.log(playlist);
        // console.log(playlist.playlists.items)
        var randomMusic = playlist.playlists.items[Math.floor(Math.random() * playlist.playlists.items.length)].uri;
        console.log(randomMusic);
        var musicDiv = $("<div>");
        var musicIframe = $('<iframe src="https://open.spotify.com/embed?uri=' + randomMusic + '" width="300" height="300" frameborder="0" allowtransparency="true" allow="encrypted-media">' + '</iframe>');
        
        
        musicDiv.append(musicIframe);
        $("#gifs").append(musicDiv);
        
    },
    error: function () {
        console.log("It failed");
    }
    }); 
}
musicPlaylist();
{/* <iframe src="https://open.spotify.com/embed/album/6pkQfQc58FFRwpdqOxJizg" width="300" height="380" frameborder="0" allowtransparency="true"></iframe> */}


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
//     $("#button-input").val(" ");
//     var button2 = $("#button-input").val().trim();
//     butions.push(button2);
//     renderButtons();

// });

// $(document).on("click", ".gifty", topic);


// renderButtons();

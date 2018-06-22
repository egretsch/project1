var moviePosters = [];

console.log(moviePosters);

function moviePoster(index) {
    var movie = moviePosters[index];
    console.log(movie);
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
                "data-music": randomGenre,
                "class": "moviePoster",
                "src": response.Poster
            }
        )
        movieDiv.append(movieImage);
        $("#poster").append(movieDiv);
    });
}

// var musicUrl = "https://accounts.spotify.com/authorize/?"
// window.location = musicUrl + "client_id=80f8fbcd74a24b8ea1d6aab4c74ead38&response_type=token&redirect_uri=https://egretsch.github.io/project1/"

$(document).on("click", ".moviePoster", function () {
    console.log("You got music");
    $('#player').empty();
    var token = "BQBif1bVmlSvX1U6p58-QevSFdnj-RAUjGqu1CRZW575HxG6EWPKQG_OYUM0w0A-6A_GWrkTczgy6fMuMjD46CMuEcQ3horyzD8-bvypLSZfYJtGU8BymMec17xoxrj80O8GFkvroQE";
    var musicG = $(this).attr("data-music");
    var musicUrl = 'https://api.spotify.com/v1/search?q=' + musicG + '&type=playlist'
   $.ajax({
    url: musicUrl,
    method: 'GET',
    headers: {
        'Authorization': 'Bearer ' + token
    },      
    success: function (playlist) {
        console.log(playlist);
        var randomMusic = playlist.playlists.items[Math.floor(Math.random() * playlist.playlists.items.length)].uri;
        console.log(randomMusic);
        var musicDiv = $("<div>");
        var musicIframe = $('<iframe src="https://open.spotify.com/embed?uri=' + randomMusic + '" width="300" height="300" frameborder="0" allowtransparency="true" allow="encrypted-media">' + '</iframe>');
        
        $("#player").append(musicDiv);
        musicDiv.append(musicIframe);
    },
    error: function () {
        console.log("It failed");
    }
    }); 
});


$("#add-button").on("click", function (event) {
    event.preventDefault();
    console.log("I'm a button");
    var button2 = $("#button-input").val().trim();
    moviePosters.push(button2);
    $("#poster").empty();
    for (var i = 0; i < moviePosters.length; i++) {
        moviePoster(i);
    }
    $("#button-input").val(" ");
});
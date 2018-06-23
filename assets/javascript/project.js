var moviePosters = [];

console.log(moviePosters);
var config = {
    apiKey: "AIzaSyB55nu5FoRbobBy05WCIFI5SJB1kksFaNE",
    authDomain: "project-1-44e93.firebaseapp.com",
    databaseURL: "https://project-1-44e93.firebaseio.com",
    projectId: "project-1-44e93",
    storageBucket: "",
    messagingSenderId: "80353045038"
};
firebase.initializeApp(config);

var database = firebase.database();

function moviePoster(index, movieFromDb) {

    // this is here because of the old implementation using the moviePosters array, not needed anymore with firebase update:
    if (index > 0) {
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
    // this is now used with firebase:
    else {
        var movie = movieFromDb;
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

}

// var musicUrl = "https://accounts.spotify.com/authorize/?"
// window.location = musicUrl + "client_id=80f8fbcd74a24b8ea1d6aab4c74ead38&response_type=token&redirect_uri=https://egretsch.github.io/project1/"

$(document).on("click", ".moviePoster", function () {
    console.log("You got music");
    $('#player').empty();
    var token = "BQD7cRm7sZwEwwYkHSeufh_1qpgaCt1ZXwBjJSCHO7UTlku_W4qwqkF-0XVikaTAjfomZHVKk2Q3jgq0iuzIE-FmAN9ZIW1cedxn8KvGYwGU1jL49xqmNJnA0-mj_mF1z31honNGwwY";
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

    // not needed with using firebase
    moviePosters.push(button2);

    // firebase update:
    var movieObj = {
        movieFromDb: button2
    }
    database.ref().push(movieObj);


    // Not needed because of firebase:
    // $("#poster").empty();
    // for (var i = 0; i < moviePosters.length; i++) {
    //     moviePoster(i);
    // }
    $("#button-input").val(" ");
});


// Runs like a for loop:
database.ref().on("child_added", function (snapShot) {

    moviePoster(-1, snapShot.val().movieFromDb);

})
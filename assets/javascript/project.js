var moviePosters = [];
var movieArray = [];
// Get the hash of the url
const hash = window.location.hash
    .substring(1)
    .split('&')
    .reduce(function (initial, item) {
        if (item) {
            var parts = item.split('=');
            initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
    }, {});
window.location.hash = '';

// Set token
let _token = hash.access_token;

const authEndpoint = 'https://accounts.spotify.com/authorize';

// Replace with your app's client ID, redirect URI and desired scopes
const clientId = '80f8fbcd74a24b8ea1d6aab4c74ead38';
const redirectUri = 'https://egretsch.github.io/project1/';
const scopes = [
    'user-top-read'
];
// If there is no token, redirect to Spotify authorization
if (!_token) {
    window.location = `${authEndpoint}?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}`;
}

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
// Creates the image he did for the movie poster and assigned the class and takes a random genre for each poster
function moviePoster(index, movieFromDb) {
    // this is here because of the old implementation using the moviePosters array, not needed anymore with firebase update:
    if (index > 0) {
        var movie = moviePosters[index];
        var movieURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
        $.ajax({
            url: movieURL,
            method: "GET"
        }).then(function (response) {
            console.log("inside else movie poster")
            var genreArray = response.Genre.split(",");
            var randomGenre = genreArray[Math.floor(Math.random() * genreArray.length)];
            var movieDiv = $("<a>").addClass("carousel-item");
            var movieImage = $("<img>");
            movieImage.attr(
                {
                    "data-music": randomGenre,
                    "class": "moviePoster",
                    "src": response.Poster
                }
            )
            movieDiv.append(movieImage);
            $(".carousel").append(movieDiv);
        });
    }

    // this is now used with firebase:
    else {
        var movie = movieFromDb;
        var movieURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
        $.ajax({
            url: movieURL,
            method: "GET"
        }).then(function (response) {
            console.log("inside else movie poster")
            var genreArray = response.Genre.split(",");
            var randomGenre = genreArray[Math.floor(Math.random() * genreArray.length)];
            var movieDiv = $("<a>").addClass("carousel-item");
            var movieImage = $("<img>");
            movieImage.attr(
                {
                    "data-music": randomGenre,
                    "class": "moviePoster",
                    "src": response.Poster
                }
            )
            movieDiv.append(movieImage);
            $('.carousel').append(movieDiv);
            $('.carousel').carousel();
        });
    }
}
// On click the movie poster will create a I-frame player with a randomly generated playlist
$(document).on("click", ".moviePoster", function () {
    $('#player').empty();
    var token = _token;
    var musicG = $(this).attr("data-music");
    var musicUrl = 'https://api.spotify.com/v1/search?q=' + musicG + '&type=playlist'
    $.ajax({
        url: musicUrl,
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        success: function (playlist) {
            var randomMusic = playlist.playlists.items[Math.floor(Math.random() * playlist.playlists.items.length)].uri;
            var musicDiv = $("<div>");
            var musicIframe = $('<iframe src="https://open.spotify.com/embed?uri=' + randomMusic + '" width="300" height="300" frameborder="0" allowtransparency="true" allow="encrypted-media">' + '</iframe>');
            $("#player").append(musicDiv);
            musicDiv.append(musicIframe);
        },
        error: function () {
        }
    });
});
// On the click takes the movie entered into the user input box and moves it to an array which gives back the movie poster
$("#sudMovie").on("click", function (event) {
    event.preventDefault();
    var button2 = $("#search").val().trim();

    // firebase update:
    var movieObj = {
        movieFromDb: button2
    }
    if (!movieArray.includes(button2)) {
        database.ref().push(movieObj);
    }
    $("#search").val(" ");
});
// Code that allows enter or click on submit to submit information to the database as well as the array
$(document).keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
    event.preventDefault();

    var button2 = $("#search").val().trim();

    // firebase update:
    var movieObj = {
        movieFromDb: button2
    }
    if (!movieArray.includes(button2)) {
        database.ref().push(movieObj);
      
    }

    $("#search").val(" ");
    }
});

// Runs like a for loop:
database.ref().on("child_added", function (snapShot) {
    moviePoster(-1, snapShot.val().movieFromDb);
    movieArray.push(snapShot.val().movieFromDb);
})

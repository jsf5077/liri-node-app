// At the top of the `liri.js` file, add code to read and set any environment variables with the dotenv package:
require("dotenv").config();

// Add the code required to import the `keys.js` file and store it in a variable.
var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

// You should then be able to access your keys information like so
var spotify = new Spotify(keys.spotify);

// Include the axios npm package 
var axios = require("axios");

var input = process.argv;
var operator = input[2];
var first = parseFloat(input[3]);

///////////////////////////////////spotify///////////////////////////////////

// * `spotify-this-song`


spotify.search({ type: 'track', query: 'All the Small Things', limit: 1 }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
  console.log("Artist: "+data.tracks.items[0].artists[0]);
  console.log("Song Title: "+data.tracks.items[0].name);
  console.log("Song Popularity: "+data.tracks.items[0].popularity);  
  console.log("Track Number: "+data.tracks.items[0].track_number); 
  console.log("Listen here: "+data.tracks.items[0].external_urls.spotify); 
});

///////////////////////////////////IMDB///////////////////////////////////

///////////////////////////////////BandsInTown///////////////////////////////////

// "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

//////////////////////////////////CASE BREAK///////////////////////////////////////



switch (operator) {
    case "concert-this":
      console.log("COMING SOON!");
            break;
    case "spotify-this-song":
            break;
    case "movie-this":
        console.log("COMING SOON!");
            break;
    case "do-what-it-says":
        console.log("COMING SOON!");
            break;
       
}

// Make it so liri.js can take in one of the following commands:

// * `concert-this`

// * `spotify-this-song`

// * `movie-this`

// * `do-what-it-says`
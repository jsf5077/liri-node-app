// At the top of the `liri.js` file, add code to read and set any environment variables with the dotenv package:
require("dotenv").config();

// Add the code required to import the `keys.js` file and store it in a variable.
var keys = require("./keys");

var Spotify = require('node-spotify-api');

// You should then be able to access your keys information like so
var spotify = new Spotify(keys.spotify);

// Include the axios npm package 
var axios = require("axios");

var input = process.argv;
var operator = input[2];
var clientInput = input[3]

///////////////////////////////////spotify///////////////////////////////////

// * `spotify-this-song`

function song() {
spotify.search({ type: 'track', query: clientInput, limit: 1 }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
  console.log("Artist: "+data.tracks.items[0].artists[0].name);
  console.log("Song Title: "+data.tracks.items[0].name);
  console.log("Song Popularity: "+data.tracks.items[0].popularity);  
  console.log("Track Number: "+data.tracks.items[0].track_number); 
  console.log("Listen here: "+data.tracks.items[0].external_urls.spotify); 
});
}
///////////////////////////////////IMDB///////////////////////////////////

// * `movie-this`

function movie() {
  var movie = input[3];
movie.replace(" ","+");

// axios request to the OMDB API with the movie specified
axios.get("http://www.omdbapi.com/?t="+movie+"&y=&plot=short&apikey=trilogy").then(
  function(response) {
    console.log("The movie's rating is: " + response.data.imdbRating);
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });

}
///////////////////////////////////BandsInTown///////////////////////////////////

// "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

//////////////////////////////////CASE BREAK///////////////////////////////////////

// Make it so liri.js can take in one of the following commands:

switch (operator) {
    case "concert-this":
      console.log("COMING SOON!");
            break;
    case "spotify-this-song":
      song();
            break;
    case "movie-this":
        movie();
            break;
    case "do-what-it-says":
        console.log("COMING SOON!");
            break;
       
}

// * `movie-this`

// * `do-what-it-says`
// At the top of the `liri.js` file, add code to read and set any environment variables with the dotenv package:
require("dotenv").config();

// Add the code required to import the `keys.js` file and store it in a variable.
var keys = require("./keys");

var moment = require("moment");

var Spotify = require('node-spotify-api');

var fs = require('fs');

// You should then be able to access your keys information like so
var spotify = new Spotify(keys.spotify);

// Include the axios npm package 
var axios = require("axios");

var input = process.argv;
var operator = input[2];
var clientInput = input[3]
var log = operator+" '"+clientInput+"' \r\n"
console.log(log);

fs.appendFile("log.txt",log, 'utf8',
function(err) { 
  if (err) throw err;
  // if no error
  // console.log("Data is appended to file successfully.")
});
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
  var movie = input[3].split(" ").join("+");
  var movieQuery = "http://www.omdbapi.com/?t="+movie+"&y=&plot=short&apikey=trilogy"
// axios request to the OMDB API with the movie specified
axios.get(movieQuery).then(
  function(response) {
    console.log("Movie Title: " + response.data.Title);
    console.log("IMDB rating: " + response.data.Plot);
    console.log("Actors: " + response.data.Actors);
    console.log("Release Year: " + response.data.Year);
    console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
    console.log("IMDB rating: " + response.data.imdbRating);
    console.log("Country: " + response.data.Country);
    console.log("Language: " + response.data.Language);
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



function band() {
  var artist =clientInput.split(" ").join("+");
  console.log(artist);
  var concertQuery = "https://rest.bandsintown.com/artists/"+artist+"/events?app_id=codingbootcamp"

// axios request to the bandsintown API with the artist specified
axios.get(concertQuery).then(
  function(response) {
    for (i=0; i < 3; i++){
    console.log(" ")
    console.log("---------- Concert Event ----------")
    console.log(" ")
    console.log("Venue: " + response.data[i].venue.name);
    console.log("Date: " + moment(response.data[i].datetime).format("MM/DD/YYYY"+" h:mm A"));
    console.log("Location: " + response.data[i].venue.city+", "+response.data[i].venue.region);
    console.log("Performing Artists: ")
    for(j=0; j < response.data[i].lineup.length; j++) {
      console.log("      "+response.data[i].lineup[j]);
    }
    console.log(" ")
    console.log("More Information: " + response.data[i].url);
  }
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
};

//////////////////////////////////DO WHAT IT SAYS///////////////////////////////////////

function doIt() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
        return console.log(error);
    }
    var dataArr = data.split(',');
    console.log(dataArr);

    input[2] = dataArr[0];
    input[3] = dataArr[1];

    operator = input[2];
    //discovered an issue where the quotes were kept when brought over to the switchBreak function.
    //For the most part it wasn't an issue except for concert-this in which the quotes were causing a faulty return in the query
    //this little trick I discovered on stackoverflow helped with my issue.
    //https://stackoverflow.com/questions/19156148/i-want-to-remove-double-quotes-from-a-string
    clientInput = input[3].replace(/['"]+/g, '');
    
    

    // console.log(operator);
    // console.log(clientInput);

    switchBreak();
  })
}
//////////////////////////////////CASE BREAK///////////////////////////////////////

// Make it so liri.js can take in one of the following commands:
function switchBreak() {
  switch (operator) {
      case "concert-this":
        if (!clientInput) {
          clientInput = "Halestorm"
          band();
        } else {
        band();
        }
              break;
      case "spotify-this-song":
        if (!clientInput) {
          clientInput = "The Sign Ace of Base"
          song();
        } else {
        song();
        }
              break;
      case "movie-this":
        if (!clientInput) {
          clientInput = "Mr. Nobody"
          movie();
        } else {
        movie();
        }
              break;
      case "do-what-it-says":
          doIt();
              break;
      default:
        console.log("Welcome to LIRI.");
        console.log(" ");
        console.log("You can use LIRI with four commands to get info about your favorite songs, movies, and upcoming artists of your favorite bands/artists ");
        console.log(" ");
        console.log("           ------ WARNING ------");
        console.log(" ");
        console.log("Your search term following your chosen command must be enclosed in parentheses");
        console.log(" ");
        console.log("           ------ COMMANDS ------");
        console.log(" ");
        console.log("'spotify-this-song' followed by a song name will provide information about your song choice.");
        console.log("     If you do not get the specified information you seek, include the artist name in the search to narrow the results.");
        console.log("'movie-this' followed by a movie title will provide information about your movie choice.");
        console.log("'concert-this' followed by a band/artist name will provide information about the band's/artists three upcoming concerts.");
        console.log("'do-what-it-says' this will give a surprise answer");      
  }
};
switchBreak();

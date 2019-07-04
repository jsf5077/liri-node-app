# liri-node-app

## A node based Language Interpretation and Recognition Interface

Much like Apple's SIRI application, LIRI intakes specific commands and gives custom feedback to the user. SIRI uses voice recognition where LIRI uses language recognition. 



### Commands to run LIRI

Follow the format presented in these queries

1. node liri.js concert-this ```"<artist name here>"```

* Shows the following information about the Artists three upcoming concerts in terminal/bash window.
    * Venue
    * Date
    * Location
    * Performing Artists
    * A Link to more information about this show

2. node liri.js spotify-this-song ```"<song name here>"```
* Shows the following information about the chosen song in terminal/bash window.
    * Artist of The Song
    * Official Song Title
    * Song Popularity
    * Song Album
    * Track Number
    * A Link to Listen to the Song on Spotify

3. node liri.js movie-this ```"<movie name here>"```

* Shows the following information about the chosen movie in terminal/bash window.
    * Official Movie Title
    * Synopsis
    * Actors in The Movie
    * Release Year
    * Rotten Tomatoes Rating
    * IMDB Rating
    * Country of Origin
    * Languages



4. node liri.js do-what-it-says

* Well now you've done it... LIRI will now commit a random search of her choice supplied by whatever information exists in the random.txt file.

### Essential Nodes used

moment

dotenv

axios

node-spotify-api

fs

### API Credential sites

Bands In Town: https://www.artists.bandsintown.com/bandsintown-api

Spotify: https://developer.spotify.com/documentation/web-api/

OMDb API: http://www.omdbapi.com/


## Demonstration

https://drive.google.com/open?id=1lDWj297KE43NZ-M-32SY18St1pyk30gj

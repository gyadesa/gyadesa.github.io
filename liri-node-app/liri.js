require("dotenv").config();
var fs = require("fs");
var request = require("request");
var keys = require("./keys.js");
var Twitter = require('twitter');
var spotify = require('node-spotify-api');
var SimpleNodeLogger = require('simple-node-logger'),
    opts = {
        logFilePath: 'log.txt',
        timestampFormat: ' '
    },
    log = SimpleNodeLogger.createSimpleLogger(opts);
var client = new Twitter(keys.twitter);
var spotify = new spotify(keys.spotify);
var action = process.argv[2];
var userPick = process.argv[3];

run();

function run() {
    switch (action) {
        case "my-tweets":
            myTweets();
            break;

        case "spotify-this-song":
            spotifySong();
            break;

        case "movie-this":
            movieThis();
            break;

        case "do-what-it-says":
            doSays();
            break;
    };
};

function myTweets() {

    var params = { screen_name: 'billyjoel' };

    client.get('statuses/user_timeline', params, function (error, tweets, response) {

        if (!error) {

            for (var i = 0; i < 19 && i < tweets.length; i++) {
                log.info("=======================");
                log.info(tweets[i].text);
                log.info(tweets[i].created_at);
            };
        };
    });
};

function spotifySong() {
    if (!userPick) {
        userPick = "the sign by ace of base"
    };

    spotify.search({ type: 'track', query: userPick }, function (err, data) {
        if (err) {
            log.info('Error occurred: ' + err);
            return;
        };

        var data = data.tracks.items

        log.info("========================")
        log.info("The Artist is: " + data[0].artists[0].name);
        log.info("The song title is: " + data[0].name);
        log.info("Preview Link: " + data[0].preview_url);
        log.info("The album title is: " + data[0].album.name);
    });
};

function movieThis() {
    if (!userPick) {
        userPick = "Mr. Nobody."
    };

    var queryUrl = "http://www.omdbapi.com/?t=" + userPick + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function (error, response, body) {

        if (!error && response.statusCode === 200) {

            log.info("Title of the movie: " + JSON.parse(body).Title);
            log.info("Year the movie came out: " + JSON.parse(body).Year);
            log.info("IMDB Rating of the movie: " + JSON.parse(body).imdbRating);
            log.info("Rotten Tomatoes Rating of the movie: " + JSON.parse(body).Ratings[2].Value);
            log.info("Country where the movie was produced: " + JSON.parse(body).Country);
            log.info("Language of the movie: " + JSON.parse(body).Language);
            log.info("Plot of the movie: " + JSON.parse(body).Plot);
            log.info("Actors in the movie: " + JSON.parse(body).Actors);
        };
    });
};

function doSays() {

    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            log.info('Error occurred: ' + error);
            return;
        }
        data = data.split(",");
        action = data[0];
        userPick = data[1];

        run();
    });
};


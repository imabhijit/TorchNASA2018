//Import twit module
var Twit = require('twit');

var keys = require('./keysConfig');

var twitter = new Twit(keys);

twitter.get('search/tweets', { q: '#nasatorch', count: 25 }, function(err, data, response) {
    data.statuses.forEach(tweet => {
        if (tweet.coordinates != null){
        longitude = tweet.coordinates.coordinates[0];
        lattitude = tweet.coordinates.coordinates[1];

        console.log("Message: \'" + tweet.text + "\'");
        console.log(" The Coordinates are Lattitude: " + lattitude + ", Longitude: " + longitude);
        }
    });
});
//Import twit module
var Twit = require('twit');

var keys = require('./keysConfig');

var twitter = new Twit(keys);

function getUpdates() {
    twitter.get('search/tweets', {q: '#nasatorch', count: 2}, function (err, data, response) {
        var torchArr = [];
        data.statuses.forEach(tweet => {
            let longitude = null;
            let lattitude = null;
            let image = null;

            if (tweet.coordinates != null) {
                longitude = tweet.coordinates.coordinates[0];
                lattitude = tweet.coordinates.coordinates[1];
                // console.log("Message: \'" + tweet.text + "\'");
                // console.log("The Coordinates are Lattitude: " + lattitude + ", Longitude: " + longitude);
                if (tweet.entities.media != undefined) {
                    image = tweet.entities.media[0].media_url;
                    // console.log("Image: " + image.media_url);
                }
                // console.log("Time: " + tweet.created_at);
                // console.log("-----------------------------------------");
            }

            let t1 = {msg: tweet.text, lng: longitude, lat: lattitude, img: image, time: tweet.created_at};
            // console.log("torchArr Before------------------------------" + JSON.stringify(torchArr));
            torchArr.push(t1);
            // console.log("torchArr After------------------------------" + JSON.stringify(torchArr));

        });
        return torchArr;
    });
}

//For Dev (Actual delay = 1000*60*5)
// setInterval(test, 5000);
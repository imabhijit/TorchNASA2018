//Import twit module
var Twit = require('twit');

var fs = require('fs');

var keys = require('./keysConfig');

var twitter = new Twit(keys);

var obj = {table: []};

function getUpdates() {
    twitter.get('search/tweets', {q: '#nasatorch', count: 20}, function (err, data, response) {
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

            torchArr.push(t1);


        });
        json = JSON.stringify(torchArr); //convert it back to json
        fs.writeFile('test.json', json, 'utf8', function writeCallback(err){
            if(err){
                console.log(err);
            }
        });

    });
}

//For Dev (Actual delay = 1000*60*5)
setInterval(getUpdates, 1000*60*5);

//Import twit module
var Twit = require('twit');

var fs = require('fs');

var keys = require('./keysConfig');

var twitter = new Twit(keys);

var obj = {table: []};

var accountSid ='AC69f4ce71356fac168024a4b4bb1e3b8f'; //reaL: AC69f4ce71356fac168024a4b4bb1e3b8f test: AC173bc10ec066e79419b02cbf44273b8c
var authToken ='73ad313fe49d96b7fac2ef65e7244494'; // real: 73ad313fe49d96b7fac2ef65e7244494 test: 02c254642b6f6dcd3669ca2ff9000488
var twilio = require('twilio');


function sendMessages(){
    numbers = ['15142986489','15148826923','15145499230'];
    numbers.forEach( num =>{
    new twilio(accountSid, authToken).messages.create({
    to: num,
    from: '+14387957138'
}).then((message) => console.log(message.sid)).done();
    });

}

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
                if (tweet.entities.media != undefined) {
                    image = tweet.entities.media[0].media_url;
                }
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
setInterval(getUpdates, 5000);

initMap();

function initMap() {
  var position;
  var map = L.map('map');

  //If geolocalisation is available, center the map at the user's location.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setLoc);
  } else {
    alert("has NO geolocolisation");
    map.setView([45.4948557, -73.5628189], 12);
  }

  function setLoc(position) {
    map.setView([position.coords.latitude, position.coords.longitude], 12);
    //        alert(position.coords.latitude + " : " + position.coords.longitude);
  }

  // set map tiles source
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(map);

  //set icon
  var myIcon = L.icon({
    iconUrl: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/129/fire_1f525.png',
    iconSize: [20, 20]
  });

  //setTimeout(delay, 500);



  // function makeMarkers(torchArr) {
  //     for (var i = 0; i < torchArr.length; i++) {
  //         markers[i] = {
  //             content: '<p>' + torchArr[i].msg + '</p>' + '<p>' + torchArr[i].time + '</p>' + '<p><img src=' + torchArr[i].img + ' style="width:200px"></p>',
  //             coords: {lat: torchArr[i].lat, lng: torchArr[i].lng}
  //         }
  //     }
  //
  // }



 var markers = [];

$.getJSON("./test.json", function(json) {
  console.log(json[0].msg);
  makeMarkers(json); // this will show the info it in firebug console
});

  function makeMarkers(torchArr) {
    for (var i = 0; i < torchArr.length; i++) {
      if(!torchArr[i].lat & !torchArr[i].lng){
        continue;
      }
      markers[i] = L.marker( [ torchArr[i].lat, torchArr[i].lng],{icon:myIcon}).addTo(map);
      if(torchArr[i].img){
        markers[i].bindPopup("<p>" + torchArr[i].msg+"</p> <p>" + torchArr[i].time+ "</p><img id =  &quotimages&quot src= "+ torchArr[i].img +">",{maxWidth: "auto"
}).openPopup();
      }else {
        markers[i].bindPopup("<p>" + torchArr[i].msg+"</p> <p>" + torchArr[i].time+ "</p>",{maxWidth: "auto"}).openPopup();
      }
    }
  }

  // function delay() {
  //   for (var i = 0; i < markers.length; i++) {
  //     markers[i].addTo(map);
  //   }
  // }


}

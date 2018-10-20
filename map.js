function initMap() {
    // Create a new StyledMapType object, passing it an array of styles,
    // and the name to be displayed on the map type control.
    var styledMapType = new google.maps.StyledMapType(
        [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f5f5f5"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#9a908c"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#1F5FAB"},{"visibility":"on"}]}],{name: 'Styled Map'});

    // Create a map object, and include the MapTypeId to add
    // to the map type control.
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat:  45.5124, lng: -73.55468},
        zoom: 12 ,
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP]
        }, // here´s the array of controls
        disableDefaultUI: true, // a way to quickly hide all controls
        mapTypeControl: true,
        scaleControl: true,
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.LARGE
        },
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var iconFIRE = {
        url: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/129/fire_1f525.png',
        scaledSize: new google.maps.Size(10, 10), // scaled size
        origin: new google.maps.Point(0,0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
    };

    var markers = [];

    function makeMarkers(torchArr){
        for (var i = 0; i < torchArr.length;i++){
          if(torchArr[i].img){
            markers[i] = {
                content: '<p>' + torchArr[i].msg + '</p>' + '<p>' + torchArr[i].time + '</p>'
                + '<img src=' + torchArr[i].img + ' alt="Bob">',
                coords:{
                    lat: torchArr[i].lat, lng: torchArr[i].lng
                }
            }
          }
          else{
            markers[i] = {
                content: '<p>' + torchArr[i].msg + '</p>' + '<p>' + torchArr[i].time + '</p>',
                coords:{
                    lat: torchArr[i].lat, lng: torchArr[i].lng
                }
            }

          }

        }
    }

    function addMarker(props) {
        var marker = new google.maps.Marker({
            position: props.coords,
            map: map,
            icon: iconFIRE,
            //icon:props.iconImage
        });
        // Check content
        if (props.content) {
            var infoWindow = new google.maps.InfoWindow({
                content: props.content
            });
            marker.addListener('click', function() {
                infoWindow.open(map, marker);
            });
        }

    }

    $.getJSON("./test.json", function(json) {
        console.log(json[0].msg);
        makeMarkers(json);// this will show the info it in firebug console
    });

    function delay() {
        for (var i = 0; i < markers.length; i++) {
            addMarker(markers[i]);
        }
    }

    setTimeout(delay, 2000);

    //Associate the styled map with the MapTypeId and set it to display.
    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');
}

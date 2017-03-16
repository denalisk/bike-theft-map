Map = function() {
  this.center;
  this.map;
};

Map.prototype.displayMap = function(city) {
  this.center = {lat: city[1], lng: city[2]};
  this.map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: this.center,
    styles: [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f5f5f5"
          }
        ]
      },
      {
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#f5f5f5"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#bdbdbd"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e5e5e5"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dadada"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e5e5e5"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#c9c9c9"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      }
    ]
  });
}

Map.prototype.updateMap = function(cityDataArray) {
  this.map.setCenter({lat: cityDataArray[1], lng: (cityDataArray[2] - 0.5)});
  if(cityDataArray[3] < 50) {
    this.map.setZoom(9);
  }
  else {
    this.map.setZoom(7);
  }
}

Map.prototype.genMarker = function(cityDataArray) {
  //   // This function takes a city data array = [cityName, latitude, longitude, theftCount]
  var current = this;
  var vectorLocation = {lat: cityDataArray[1], lng: cityDataArray[2]};
  var point = new google.maps.Circle({
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    map: current.map,
    center: vectorLocation,
    radius: cityDataArray[3] * 1000
  });
};

Map.prototype.getCoordinates = function(cityDataArray) {
  var current = this;
  var city = cityDataArray[4];
  // cityDataArray[1] = 39;
  // cityDataArray[2] = -98;
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode( { 'address': city}, function(results, status) {
    if (status == 'OK') {
      cityDataArray[1] = results[0].geometry.location.lat();
      cityDataArray[2] = results[0].geometry.location.lng();
      if (cityDataArray[5]) {
        console.log("You're in the branch!");
        current.updateMap(cityDataArray)
      }
      current.genMarker(cityDataArray);
    } else {
      console.log('Geocode was not successful for the following reason: ' + status);
    }
  });
};

exports.mapModule = Map;

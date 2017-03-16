Map = function() {
  this.center;
  this.map;
};

Map.prototype.displayMap = function() {
  this.center = {lat: 39.50, lng : -98.35};
  this.map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: this.center
  });
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
  cityDataArray[1] = 39;
  cityDataArray[2] = -98;
  //REACTVATE WHEN LIVE
  // var geocoder = new google.maps.Geocoder();
  // geocoder.geocode( { 'address': city}, function(results, status) {
  //   if (status == 'OK') {
  //     cityDataArray[1] = results[0].geometry.location.lat();
  //     cityDataArray[2] = results[0].geometry.location.lng();
  //     console.log("Get Coords: " + cityDataArray);
      current.genMarker(cityDataArray);
  //   } else {
  //     alert('Geocode was not successful for the following reason: ' + status);
  //   }
  // });
}

exports.mapModule = Map;

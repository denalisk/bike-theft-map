Map = function() {
  this.center;
  this.map;
};

Map.prototype.displayMap = function() {
  this.center = {lat: 47.61, lng : 122.33};
  this.map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: this.center
  });
}

Map.prototype.genMarker = function(cityDataArray) {
//   // This function takes a city data array = [cityName, latitude, longitude, theftCount]
var current = this;
  var vectorLocation = {lat: cityDataArray[1], lng: cityDataArray[2]};
  var point = new google.maps.Marker({
    position: vectorLocation,
    map: current.map
  });
};

Map.prototype.getCoordinates = function(cityDataArray) {
  var city = cityDataArray[0];
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode( { 'address': city}, function(results, status) {
    if (status == 'OK') {
      cityDataArray[1] = results[0].geometry.location.lat();
      cityDataArray[2] = results[0].geometry.location.lng();
      console.log(cityDataArray);
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

exports.mapModule = Map;

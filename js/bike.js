function Bike() {

}

//These are apparently equal:
//1243231200
//05.25.2009

var bikeArray = [];

function searchByLocation(city, page, map, divMaker) {
  bikeArray = [];
  $.get("https://bikeindex.org:443/api/v3/search?page=" + page + "&per_page=100&location=" + city + "&distance=10&stolenness=proximity")
  .then(function(response) {
    response.bikes.forEach(function(item) {
      bikeArray.push(item);
      divMaker(item);
    });
    var cities = processUniqueLocations(bikeArray, map);

  })
  .fail(function(error) {
    console.log(error);
  })
}

var processUniqueLocations = function(bikeArray, map) {
  var current = bikeArray;
  var uniqueLocations = [];
  for(var index = 0; index < bikeArray.length; index++) {
    var found = false;
    var city = current[index].stolen_location.split(",")[0];
    var locationFull = current[index].stolen_location;
    for(var jdex = 0; jdex < uniqueLocations.length; jdex++) {
      if(uniqueLocations[jdex][0] === city) {
        uniqueLocations[jdex][3]++;
        found = true;
        break;
      }
    }
    if(!found) {
      var cityDataArray = [city, 0, 0, 1, locationFull, false];
      map.getCoordinates(cityDataArray);
      uniqueLocations.push(cityDataArray);
    }
  }
  var maxThefts = [0, 0];
  for(var kdex = 0; kdex < uniqueLocations.length; kdex++) {
    if (uniqueLocations[kdex][4] > maxThefts[0]) {
      maxThefts[0] = uniqueLocations[kdex][4];
      maxThefts[1] = kdex;
    }
  }
  uniqueLocations[maxThefts[1]][5] = true;
  return uniqueLocations;
}

exports.bikeModule = Bike;
exports.searchModule = searchByLocation;

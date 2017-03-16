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
  var current = bikeArray.slice();
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
      if(uniqueLocations.length === 0){
        var cityDataArray = [city, 0, 0, 1, locationFull, true];
        map.getCoordinates(cityDataArray);
        uniqueLocations.push(cityDataArray);
      }
      else {
        var cityDataArray = [city, 0, 0, 1, locationFull, false];
        map.getCoordinates(cityDataArray);
        uniqueLocations.push(cityDataArray);
      }
    }
  }

  return uniqueLocations;
}


exports.searchModule = searchByLocation;

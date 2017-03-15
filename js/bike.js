function Bike() {

}

//These are apparently equal:
//1243231200
//05.25.2009

var bikeArray = [];

function searchByLocation(city, page, divMaker) {
  $.get("https://bikeindex.org:443/api/v3/search?page=" + page + "&per_page=100&location=" + city + "&distance=10&stolenness=proximity")
  .then(function(response) {
    console.log(response);
    response.bikes.forEach(function(item) {
      bikeArray.push(item);
      console.log("It's happening!");
      divMaker(item);
    });
    getUniqueLocations(bikeArray);
  })
  .fail(function(error) {
    console.log(error);
  })
}

var getUniqueLocations = function(bikeArray) {
  var current = bikeArray;
  var uniqueLocations = [];
  for(var index = 0; index < bikeArray.length; index++) {
    var city = current[index].stolen_location.split(",");
    if(!(uniqueLocations.includes(city[0]))) {
      uniqueLocations.push(city[0]);
    }
  }
  console.log(uniqueLocations);
}

exports.bikeModule = Bike;
exports.searchModule = searchByLocation;

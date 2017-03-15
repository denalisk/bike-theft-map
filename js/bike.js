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
  })
  .fail(function(error) {
    console.log(error);
  })
}

exports.bikeModule = Bike;
exports.searchModule = searchByLocation;

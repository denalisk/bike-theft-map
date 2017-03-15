var Bike = require("./../js/bike.js").bikeModule;
var Search = require("./../js/bike.js").searchModule;

function makeDiv(bike) {
  $(".bike-container").append(
    "<div class='bike-div' id='" + bike.id + "'>" + bike.title + "</div>"
  )

  $("#" + bike.id).click(function(){
    console.log(bike.id);
  });
};

$(function(){
  var page = 1;
  $(".search-form").submit(function(event){
    event.preventDefault();

    Search($("#location-input").val(), page, makeDiv);
    page++
  });


});

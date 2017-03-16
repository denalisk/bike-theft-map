var Bike = require("./../js/bike.js").bikeModule;
var Search = require("./../js/bike.js").searchModule;
var Map = require("./../js/map.js").mapModule;

function makeDiv(bike) {
  $(".bike-container").append(
    "<div class='bike-div' id='" + bike.id + "'> <h4>" + bike.title + "</h4></div>"
  )
  $("#" + bike.id).click(function(){

    $(".bike-info").hide();
    $(".bike-info").animate({right: "-90%"}, 0);
    $(".bike-info").show();
    $(".bike-info").animate({right: "5%"}, 500);
    $(".bike-title").text(bike.title);
    $(".bike-date").text(bike.date_stolen);
    $(".bike-frame-model").text(bike.frame_model);
    $(".bike-manufacturer").text(bike.manufacturer_name);
    $(".bike-stolen-location").text(bike.stolen_location);
    if(bike.thumb) {
      document.getElementById("bike-img").src = bike.thumb;
    } else {
      document.getElementById("bike-img").src = "http://www.clker.com/cliparts/Q/H/2/F/7/J/bike-graphic-hi.png";
    }
    document.getElementById("bike-img").setAttribute("alt", bike.title);
  });
};

$(function(){
  var newMap = new Map();
  var page = 1;
  $(".search-form").submit(function(event){
    event.preventDefault();
    newMap.displayMap();
    Search($("#location-input").val(), page, newMap, makeDiv);
    page++;
  });

  $("#close").click(function(){
    $(".bike-info").animate({right: "-90%"}, 500).queue(function(){
      $(".bike-info").hide().dequeue();
      $(this).dequeue();
    });
  })


});

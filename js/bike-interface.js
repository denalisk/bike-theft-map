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
    var date = new Date(bike.date_stolen*1000);
    $(".bike-date").text((date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear());
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
  newMap.displayMap(["", 47, -122, 0]);
  var page = 1;
  $(".search-form").submit(function(event){
    page = 1;
    event.preventDefault();
    var city = [$("#location-input").val(), 0, 0, 0, $("#location-input").val()];
    newMap.getCoordinates(city);
    Search($("#location-input").val(), page, newMap, makeDiv);
  });

  $("#close").click(function(){
    $(".bike-info").animate({right: "-90%"}, 500).queue(function(){
      $(".bike-info").hide().dequeue();
      $(this).dequeue();
    });
  });

  var scrolled = false;
  $(".bike-container").scroll(function () {
    if(scrolled == false)
    {
      if($(".scroll-tracker").offset().top - $(".bike-container").height() < 200)
      {
        scrolled = true;
        page++;
        Search($("#location-input").val(), page, newMap, makeDiv);
        setTimeout(function(){
          scrolled = false;
        }, 5000);
      }
    }

  });
});

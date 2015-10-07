$(function(){
  
  var helpers = {
    createWeatherWidget: function (data){ 
    },
    clearDiv: function(){
      $('.wclear').find('p').remove();
      $('.wclear').find('.city').remove();
    },
    searchCities: function(){
      var keyword = $(this).attr("action") + $("input[name=weather-keyword]").val();
      helpers.clearDiv();
      $.getJSON(keyword +"&cb=?",function(data){
        data.RESULTS.forEach(function(element){
        $('.wclear').append("<div class='city'> <button> "+element.name+"</button><hr></div");
        });

        $('.city').each(function(){
        $(this).on('click',function(){
          helpers.clearDiv();
          weatherURL = "http://api.wunderground.com/api/06352b9690b02b4c/conditions/q/"+$(this).find('button').text().trimLeft() + ".json";
          $.getJSON(weatherURL,function(data){
          $('<p>'+data.current_observation.weather+'</p>').appendTo($('.wclear'));
          
          });
        });
        });
      });
      return false;
      }
  };

  $('#wnewsearch').on('submit',helpers.searchCities);
});

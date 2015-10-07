$(function(){
  function createWeatherWidget(data){
    return data;
  }
  $('#wnewsearch').on('submit',function(event){
    var keyword = $(this).attr("action") + $("input[name=weather-keyword]").val();
    
    $.getJSON(keyword +"&cb=?",function(data){
      data.RESULTS.forEach(function(element){
      $('.wclear').append("<div class='city'> <button> "+element.name+"</button><hr></div");
      });

      $('.city').each(function(event){
      $(this).on('click',function(){
        weatherURL = "http://api.wunderground.com/api/06352b9690b02b4c/conditions/q/"+$(this).find('button').text().trimLeft() + ".json";
        $.getJSON(weatherURL,function(data){
        $('<p>'+data.current_observation.weather+'</p>').appendTo($('.wclear'));
        $('.wclear').find('.city').remove();
        });
      });
      });
    });
    return false;
  });
});

// data.current_observation.weather
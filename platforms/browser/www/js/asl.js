function returnToMainPage() {
  console.log("going home")
  $("#game-scouting:visible, #pit-scouting:visible, #game-home:visible, #pit-home:visible").fadeOut(function(){
    $("#home").fadeIn();
  })
}

function clearGameScouting() {
  $('.points-total').text(0);
  
  $(':input','#game-scouting')
  .removeAttr('checked')
  .removeAttr('selected')
  .not(':button, :submit, :reset, :hidden, :radio, :checkbox')
  .val('');
  
  $('input:checkbox, #game-scouting').prop('checked', false);
}

function getGameScoutingData() {
  var data = {};
  data["auto"] = {};
  data["auto"]["high-goals"] =  parseInt($("#game-scouting-auto-high-goals").text());
  data["auto"]["low-goals"] = parseInt($("#game-scouting-auto-low-goals").text());
  data["auto"]["gears"] = parseInt($("#game-scouting-auto-gears").text());
  data["auto"]["baseline"] = $("#game-scouting-auto-baseline").prop("checked");
  
  data["teleop"] = {};
  data["teleop"]["high-goals"] = parseInt($("#game-scouting-high-goals").text());
  data["teleop"]["low-goals"] = parseInt($("#game-scouting-low-goals").text());
  data["teleop"]["hoppers"] = parseInt($("#game-scouting-hoppers").text());
  data["teleop"]["gears"] = 
  parseInt($("#game-scouting-gears").text());
  
  data["fouls"] ={};
  data["fouls"]["gears"] = parseInt($("#game-scouting-gears-fouls").text());
  data["fouls"]["human"] = 
  parseInt($("#game-scouting-human-fouls").text());
  data["fouls"]["shooting"] = 
  parseInt($("#game-scouting-shooting-fouls").text());
  
  data["endgame"] = {};
  data["endgame"]["climbing"] = $("#game-scouting-climbing").prop("checked");
  data["endgame"]["shooting"] = $("#game-scouting-shooting-after-climbing").prop("checked");
  
  data["other"] = {};
  data["other"]["pilot"] = $("#game-scouting-ship").prop("checked");
  data["other"]["defense"] = $("#game-scouting-defense").val();
  data["other"]["fuel"] = $("#game-scouting-fuel-location").val();
  data["other"]["notes"] = $("#game-scouting-final-notes").val();
  return data
}

$(document).ready(function(){
  $('.asl-game-scouting').click(function(){
  	var teamName = $(this).parent().parent().attr('data-team');
    var matchNumber = $(this).parent().parent().attr('data-match');
    $("#game-home").fadeOut(function(){
      $("#game-scouting").fadeIn();
      $("#game-scouting span.team-name").text(teamName);
      $("#game-scouting span.match-number").text(matchNumber);
    });
  });
  $('.navbar-brand').click(returnToMainPage);
  $('.points-element button').click(function(){
  	if ($(this).hasClass('points-up')) {
      var points = parseInt($(this).parent().parent().find('.points-total').html()) + 1;
  		$(this).parent().parent().find('.points-total').text(points < 0 ? 0 : points);
  	}
  	if ($(this).hasClass('points-down')) {
      var points = parseInt($(this).parent().parent().find('.points-total').html()) - 1;
  		$(this).parent().parent().find('.points-total').text(points < 0 ? 0 : points);
  	}
  });
  
  $("#game-scouting-submit").click(function() {
    // submit form
    var data = getGameScoutingData();
    
    var filename = "match" + $("#game-scouting span.match-number").text() + "-" + $("#game-scouting span.team-name").text() + ".json";
    
    window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function (dir) {
      alert(cordova.file.externalDataDirectory);
      dir.getFile(filename, { create: true }, function (file) {
        if(confirm("Do you want to overwrite existing scouting data if it exists?"))
          file.createWriter(function(writer) {
            writer.write(JSON.stringify(data));
          })
      });
    });
    
    returnToMainPage();
    clearGameScouting();
  });
  
  $('.asl-pit-scouting').click(function(){
    var teamName = $(this).parent().parent().attr('data-team');
    var matchNumber = $(this).parent().parent().attr('data-match');
    $("#pit-home").fadeOut(function(){
      $("#pit-scouting").fadeIn();
      $("#pit-scouting h2.team-name").text(teamName);
    });
  });
  
  $("#go-pit-scouting").click(function() {
    $("#home").fadeOut(function(){
      $("#pit-home").fadeIn();
    });
  });
  
  $("#go-game-scouting").click(function() {
    $("#home").fadeOut(function(){
      $("#game-home").fadeIn();
    });
  });
  
  document.addEventListener("backbutton", returnToMainPage, false);
});
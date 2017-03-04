function returnToMainPage() {
  console.log("going home")
  $("#game-scouting:visible, #pit-scouting:visible, #game-home:visible, #pit-home:visible").fadeOut(function(){
    $("#home").fadeIn();
  })
}

function goBack() {
  console.log("going home")
  
  if($("#game-scouting").is(":visible")) {
    $("#game-scouting:visible").fadeOut(function(){
      $("#game-home").fadeIn();
    })
  } else if($("#pit-scouting").is(":visible")) {
    $("#pit-scouting:visible").fadeOut(function(){
      $("#pit-home").fadeIn();
    })
  } else {
    $("#game-home:visible, #pit-home:visible").fadeOut(function(){
      $("#home").fadeIn();
    })
  }
}

function clearPitScouting() {
  $(':input','#pit-scouting')
  .removeAttr('checked')
  .removeAttr('selected')
  .not(':button, :submit, :reset, :hidden, :radio, :checkbox')
  .val('');
  
  $('input:checkbox, #pit-scouting').prop('checked', false);
  $('#largeImage').attr("src", "");
}

function getPitDataIfExists(teamName) {
  var filename = teamName + ".json";
  
  var text = null;
  window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function (dir) {
    dir.getFile(filename, { create: false }, function (fileEntry) {
      // The file exists, so read data from it
      fileEntry.file(function (file) {
        var reader = new FileReader();

        reader.onloadend = function() {
            refillGameScoutingData(JSON.parse(this.result));
        };

        reader.readAsText(file);

      });
    });
  });
  
  return JSON.parse(text);
}

function getPitScoutingData() {
  var data = {};
  data["general"] = {};
  data["general"]["imgsrc"] = $('#largeImage').attr("src")
  data["general"]["drivetrain"] = $("#pit-drive-train").val()
  data["general"]["speed"] = $("#select-speed").val()
  data["general"]["height"] = $("#select-height").val()
  
  data["game"] = {};
  data["game"]["has-shooter"] = $("#pit-shooter").prop("checked")
  data["game"]["shooter-type"] = $("#select-shooter").val()
  data["game"]["ball-collection"] = $("#select-ball").val()
  data["game"]["can-place-gears"] = $("#pit-gears").prop("checked")
  data["game"]["can-climb"] = $("#pit-climb").prop("checked")
  return data
}

function refillPitScoutingData(data) {
  $('#largeImage').attr("src", data["general"]["imgsrc"])
  $("#pit-drive-train").val(data["general"]["drivetrain"])
  $("#select-speed").val(data["general"]["speed"])
  $("#select-height").val(data["general"]["height"])
  
  $("#pit-shooter").prop("checked", data["game"]["has-shooter"])
  $("#select-shooter").val(data["game"]["shooter-type"])
  $("#select-ball").val(data["game"]["ball-collection"])
  $("#pit-gears").prop(data["game"]["can-place-gears"])
  $("#pit-climb").prop("checked", data["game"]["can-climb"])
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

function getGameDataIfExists(teamName, matchNumber) {
  var filename = "match" + matchNumber + "-" + teamName + ".json";
  
  var text = null;
  window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function (dir) {
    dir.getFile(filename, { create: false }, function (fileEntry) {
      // The file exists, so read data from it
      fileEntry.file(function (file) {
        var reader = new FileReader();

        reader.onloadend = function() {
            refillGameScoutingData(JSON.parse(this.result));
        };

        reader.readAsText(file);

      });
    });
  });
  
  return JSON.parse(text);
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

function refillGameScoutingData(data) {
  $("#game-scouting-auto-high-goals").text(data["auto"]["high-goals"]);
  $("#game-scouting-auto-low-goals").text(data["auto"]["low-goals"]);
  $("#game-scouting-auto-gears").text(data["auto"]["gears"]);
  $("#game-scouting-auto-baseline").prop("checked", data["auto"]["baseline"]);
  
  $("#game-scouting-high-goals").text(data["teleop"]["high-goals"]);
  $("#game-scouting-low-goals").text(data["teleop"]["low-goals"]);
  $("#game-scouting-hoppers").text(data["teleop"]["hoppers"]);
  $("#game-scouting-gears").text(data["teleop"]["gears"]);
  
  $("#game-scouting-gears-fouls").text(data["fouls"]["gears"]);
  $("#game-scouting-human-fouls").text(data["fouls"]["human"]);
  $("#game-scouting-shooting-fouls").text(data["fouls"]["shooting"]);
  
  $("#game-scouting-climbing").prop("checked", data["endgame"]["climbing"]);
  $("#game-scouting-shooting-after-climbing").prop("checked", data["endgame"]["shooting"]);
  
  
  $("#game-scouting-ship").prop("checked", data["other"]["pilot"]);
  $("#game-scouting-defense").val(data["other"]["defense"]);
  $("#game-scouting-fuel-location").val(data["other"]["fuel"]);
  $("#game-scouting-final-notes").val(data["other"]["notes"]);
}

$(document).ready(function(){
  $('.asl-game-scouting').click(function(){
  	var teamName = $(this).parent().parent().attr('data-team');
    var matchNumber = $(this).parent().parent().attr('data-match');
    getGameDataIfExists(teamName, matchNumber);
    
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
      dir.getFile(filename, { create: true }, function (file) {
        file.createWriter(function(writer) {
          writer.write(JSON.stringify(data));
        })
      });
    });
    
    goBack();
    clearGameScouting();
  });
  
  $('.asl-pit-scouting').click(function(){
    var teamName = $(this).parent().parent().attr('data-team');
    var matchNumber = $(this).parent().parent().attr('data-match');
    $("#pit-home").fadeOut(function(){
      $("#pit-scouting").fadeIn();
      $("#team-name").text(teamName);
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
  
  $("#pit-scouting-submit").click(function() {
    // submit form
    var data = getPitScoutingData();
    var imgsrc = data["general"]["imgsrc"]
    
    var filenameBase = $("#team-name").text();
    var filenameImg = filenameBase + ".jpg"
    var filename = filenameBase + ".json"
    
    alert(cordova.file.externalDataDirectory + filenameImg)
    
    // copy image to data directory
    var folders = imgsrc.split("/")
    var enclosingFolder = folders.slice(0, folders.length-1).join("/")
    var originalImg = folders[folders.length-1]
    
    window.resolveLocalFileSystemURL(enclosingFolder, function (dir) {
      dir.getFile(originalImg, { create: false }, function (file) {
        window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function (externalDataDir) {
          file.copyTo(externalDataDir, filenameImg)
        })
      });
    });
    
    
    
    window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function (dir) {
      dir.getFile(filename, { create: true }, function (file) {
        file.createWriter(function(writer) {
          writer.write(JSON.stringify(data));
        })
      });
    });
    goBack();
    clearPitScouting();
  });
  
  $("#game-scouting-clear").click(clearGameScouting)
  $("#pit-scouting-clear").click(clearPitScouting)
  
  document.addEventListener("backbutton", goBack, false);
});
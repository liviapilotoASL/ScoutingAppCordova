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
  $('input:radio, #pit-scouting').prop('checked', false);
  $('#largeImage').attr("src", "");
}

function getPitDataIfExists(teamName) {
  var filename = teamName + ".json";
  
  window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function (dir) {
    dir.getFile(filename, { create: false }, function (fileEntry) {
      // The file exists, so read data from it
      fileEntry.file(function (file) {
        var reader = new FileReader();

        reader.onloadend = function() {
            refillPitScoutingData(JSON.parse(this.result));
        };

        reader.readAsText(file);

      });
    });
  });
}

function getPitScoutingData() {
  var data = {};
  data["general"] = {};
  data["general"]["imgsrc"] = $('#largeImage').attr("src")
  data["general"]["role"] = $('input[name=role]:checked').val()
  if(data["general"]["role"] === "hybrid") {
    data["general"]["role-other"] = $('#pit-role-other').val()
  } else {
    data["general"]["role-other"] = []
  }
  data["general"]["auto-cross"] = $('#pit-cross').prop("checked")
  data["general"]["auto-high"] = $('#pit-shoot-high').prop("checked")
  data["general"]["auto-low"] = $('#pit-shoot-low').prop("checked")
  data["general"]["auto-gear"] = $('#pit-gear').prop("checked")
  data["general"]["language"] = $('input[name=lang]:checked').val()
  data["general"]["dimensions"] = $('input[name=dimension]:checked').val()
  data["general"]["weight"] = $('#pit-weight').val()
  
  data["drivetrain"] = {};
  data["drivetrain"]["type"] = $('input[name=drivetrain]:checked').val()
  if(data["drivetrain"]["type"] === "custom") {
    data["drivetrain"]["type-other"] = $('#pit-custom-drivetrain').val()
  } else {
    data["drivetrain"]["type-other"] = ""
  }
  data["drivetrain"]["wheel-size"] = $("#pit-wheel-size").val()
  data["drivetrain"]["wheel-type"] = $("#pit-wheel-type").val()
  data["drivetrain"]["wheel-quantity"] = $("#pit-wheel-quantity").val()
  data["drivetrain"]["two-speed-gearbox"] = $("#pit-gear-shift").prop("checked")
  data["drivetrain"]["high-speed"] = $("#pit-high-speed").val()
  data["drivetrain"]["low-speed"] = $("#pit-low-speed").val()
  
  data["mechanisms"] = {}
  data["mechanisms"]["high-goal"] = $("#pit-shooter-high").prop("checked")
  data["mechanisms"]["low-goal"] = $("#pit-shooter-low").prop("checked")
  data["mechanisms"]["shooter-description"] = $("#pit-shooter-description").val()
  data["mechanisms"]["chute-intake"] = $("#pit-gear-chute").prop("checked")
  data["mechanisms"]["floor-intake"] = $("#pit-gear-floor").prop("checked")
  data["mechanisms"]["gear-description"] = $("#pit-gear-description").val()
  data["mechanisms"]["climb"] = $("#pit-climb").prop("checked")
  data["mechanisms"]["climb-description"] = $("#pit-climb-description").val()
  
  data["comments"] = $("#pit-other-comments").val()
  return data
}

function refillPitScoutingData(data) {
  $('#largeImage').attr("src", data["general"]["imgsrc"])
  $("input[name=role][value=" + data["general"]["role"] +  "]" ).prop("checked", true)
  $('#pit-role-other').val(data["general"]["role-other"])
  $('#pit-cross').prop("checked", data["general"]["auto-cross"])
  $('#pit-shoot-high').prop("checked", data["general"]["auto-high"])
  $('#pit-shoot-low').prop("checked", data["general"]["auto-low"])
  $('#pit-gear').prop("checked", data["general"]["auto-gear"])
  $('input[name=lang][value=' + data["general"]["language"] + ']').prop("checked", true)
  $('input[name=dimension][value=' + data["general"]["dimensions"] + ']').prop("checked", true)
  $('#pit-weight').val(data["general"]["weight"])
  
  $("input[name=drivetrain][value=" + data["drivetrain"]["type"] +  "]" ).prop("checked", true)
  $("#pit-custom-drivetrain").val(data["drivetrain"]["type-other"])
  
  $("#pit-wheel-size").val(data["drivetrain"]["wheel-size"])
  $("#pit-wheel-type").val(data["drivetrain"]["wheel-type"])
  $("#pit-wheel-quantity").val(data["drivetrain"]["wheel-quantity"])
  $("#pit-gear-shift").prop("checked", data["drivetrain"]["two-speed-gearbox"])
  $("#pit-high-speed").val(data["drivetrain"]["high-speed"])
  $("#pit-low-speed").val(data["drivetrain"]["low-speed"])
  
  $("#pit-shooter-high").prop("checked", data["mechanisms"]["high-goal"])
  $("#pit-shooter-low").prop("checked", data["mechanisms"]["low-goal"])
  $("#pit-shooter-description").val(data["mechanisms"]["shooter-description"])
  $("#pit-gear-chute").prop("checked", data["mechanisms"]["chute-intake"])
  $("#pit-gear-floor").prop("checked", data["mechanisms"]["floor-intake"])
  $("#pit-gear-description").val(data["mechanisms"]["gear-description"])
  $("#pit-climb").prop("checked", data["mechanisms"]["climb"])
  $("#pit-climb-description").val(data["mechanisms"]["climb-description"])
  
  $("#pit-other-comments").val(data["comments"])
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
  data["auto"]["high-goals-time"] = parseInt($("#game-scouting-auto-high-goals-time").text());
  data["auto"]["low-goals"] = parseInt($("#game-scouting-auto-low-goals").text());
  data["auto"]["low-goals-time"] = parseInt($("#game-scouting-auto-low-goals-time").text());
  data["auto"]["gears-attempted"] = parseInt($("#game-scouting-auto-gears-attempted").text());
  data["auto"]["gears-scored"] = parseInt($("#game-scouting-auto-gears").text());
  data["auto"]["gears-time"] = parseInt($("#game-scouting-auto-gears-time").text());
  data["auto"]["baseline"] = $("#game-scouting-auto-baseline").prop("checked");
  
  data["teleop"] = {};
  data["teleop"]["high-goals"] = parseInt($("#game-scouting-high-goals").text());
  data["teleop"]["high-goals-time"] = parseInt($("#game-scouting-high-goals-time").text());
  data["teleop"]["low-goals"] = parseInt($("#game-scouting-low-goals").text());
  data["teleop"]["low-goals-time"] = parseInt($("#game-scouting-low-goals-time").text());
  data["teleop"]["hoppers"] = parseInt($("#game-scouting-hoppers").text());
  data["teleop"]["gears-attempted"] = parseInt($("#game-scouting-gears-attempted").text());
  data["teleop"]["gears-scored"] = parseInt($("#game-scouting-gears").text());
  data["teleop"]["gears-time"] = parseInt($("#game-scouting-gears-time").text());
  
  data["fouls"] ={};
  data["fouls"]["gears"] = parseInt($("#game-scouting-gears-fouls").text());
  data["fouls"]["human"] = 
  parseInt($("#game-scouting-human-fouls").text());
  data["fouls"]["shooting"] = 
  parseInt($("#game-scouting-shooting-fouls").text());
  
  data["endgame"] = {};
  data["endgame"]["climbing-attempted"] = $("#game-scouting-climbing-attempted").prop("checked");
  data["endgame"]["climbing"] = $("#game-scouting-climbing").prop("checked");
  data["endgame"]["shooting"] = $("#game-scouting-shooting-after-climbing").prop("checked");
  
  data["other"] = {};
  data["other"]["pilot"] = $("#game-scouting-ship").prop("checked");
  data["other"]["defense"] = $("#game-scouting-defense").val();
  data["other"]["fuel"] = $("#game-scouting-fuel-location").val();
  data["other"]["strategy-notes"] = $("#game-scouting-strategy-notes").val();
  data["other"]["notes"] = $("#game-scouting-final-notes").val();
  return data
}

function refillGameScoutingData(data) {
  $("#game-scouting-auto-high-goals").text(data["auto"]["high-goals"]);
  $("#game-scouting-auto-high-goals-time").text(data["auto"]["high-goals-time"]);
  $("#game-scouting-auto-low-goals").text(data["auto"]["low-goals"]);
  $("#game-scouting-auto-low-goals-time").text(data["auto"]["low-goals-time"]);
  $("#game-scouting-auto-gears-attempted").text(data["auto"]["gears-attempted"]);
  $("#game-scouting-auto-gears").text(data["auto"]["gears-scored"]);
  $("#game-scouting-auto-gears-time").text(data["auto"]["gears-time"]);
  $("#game-scouting-auto-baseline").prop("checked", data["auto"]["baseline"]);
  
  $("#game-scouting-high-goals").text(data["teleop"]["high-goals"]);
  $("#game-scouting-high-goals-time").text(data["teleop"]["high-goals-time"]);
  $("#game-scouting-low-goals").text(data["teleop"]["low-goals"]);
  $("#game-scouting-low-goals-time").text(data["teleop"]["low-goals-time"]);
  $("#game-scouting-hoppers").text(data["teleop"]["hoppers"]);
  $("#game-scouting-gears-attempted").text(data["teleop"]["gears-attempted"]);
  $("#game-scouting-gears").text(data["teleop"]["gears-scored"]);
  $("#game-scouting-gears-time").text(data["teleop"]["gears-time"]);
  
  $("#game-scouting-gears-fouls").text(data["fouls"]["gears"]);
  $("#game-scouting-human-fouls").text(data["fouls"]["human"]);
  $("#game-scouting-shooting-fouls").text(data["fouls"]["shooting"]);
  
  $("#game-scouting-climbing-attempted").prop("checked", data["endgame"]["climbing-attempted"]);
  $("#game-scouting-climbing").prop("checked", data["endgame"]["climbing"]);
  $("#game-scouting-shooting-after-climbing").prop("checked", data["endgame"]["shooting"]);
  
  
  $("#game-scouting-ship").prop("checked", data["other"]["pilot"]);
  $("#game-scouting-defense").val(data["other"]["defense"]);
  $("#game-scouting-fuel-location").val(data["other"]["fuel"]);
  $("#game-scouting-strategy-notes").val(data["other"]["strategy-notes"]);
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
    console.log(data)
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
    getPitDataIfExists(teamName);
    
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
    
    data["general"]["imgsrc"] = cordova.file.externalDataDirectory + filenameImg
    
    console.log(data)
    
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
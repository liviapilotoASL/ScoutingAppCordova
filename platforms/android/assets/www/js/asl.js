function returnToMainPage() {
  $("#game-scouting:visible, #pit-scouting:visible").fadeOut(function(){
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

$(document).ready(function(){
  $('.asl-pit-scouting').click(function(){
  	var teamName = $(this).parent().parent().attr('data-team');
    $("#home").fadeOut(function(){
      $("#pit-scouting").fadeIn();
      $("#pit-scouting h2.team-name").text(teamName);
    });
  });
  $('.asl-game-scouting').click(function(){
  	var teamName = $(this).parent().parent().attr('data-team');
    $("#home").fadeOut(function(){
      $("#game-scouting").fadeIn();
      $("#game-scouting span.team-name").text(teamName);
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
    
    returnToMainPage();
    clearGameScouting();
  });
  
  document.addEventListener("backbutton", returnToMainPage, false);
});
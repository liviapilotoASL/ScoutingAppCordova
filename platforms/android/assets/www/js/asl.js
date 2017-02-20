function returnToMainPage() {
  $("#game-scouting:visible, #pit-scouting:visible").fadeOut(function(){
    $("#home").fadeIn();
  })
}

$(document).ready(function(){
  $('.asl-pit-scouting').click(function(){
  	var teamName = $(this).parent().parent().attr('data-team');
    $("#home").fadeOut(function(){
      $("#pit-scouting").fadeIn();
      $("#pit-scouting span.team-name").text(teamName);
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
  		$(this).parent().parent().find('.points-total').text(parseInt($(this).parent().parent().find('.points-total').html()) + 1) 
  	}
  	if ($(this).hasClass('points-down')) {
  		$(this).parent().parent().find('.points-total').text(parseInt($(this).parent().parent().find('.points-total').text()) - 1) 
  	}
  });
  
  document.addEventListener("backbutton", returnToMainPage, false);
});
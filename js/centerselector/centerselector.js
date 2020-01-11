// Javascript
var open = false;
var close = true;

var speed = 250;
var open_css = "inset -5px 5px 10px -8px rgba(0,0,0,1),0 15px 25px -13px #000";
var closed_css = "inset -5px 5px 10px -8px rgba(0,0,0,1)";

$(document).keyup(function(e) {
  if (e.keyCode == 27) { 
  	$('#lng_open').slideUp(speed);
   	$('#lng_open').slideUp(speed);
  	open = false;
 
  }   // esc
 
});


function toggle_lng_menu() {
	if(open) {
		$('#lng_open').slideUp(speed);
		//$('a#lng-menu-icon').css('background-image','url("../img/v2/lng_normal.png")');
	} else {
		$('#lng_open').slideDown(speed);
		//$('a#lng-menu-icon').css('background-image','url("../img/v2/lng_active.png")');
	}

	open = !open;
		


}
function toggle_lng_menu1() {
	if(open) {
		$('#lng_open1').slideUp(speed);
		//$('a#lng-menu-icon').css('background-image','url("../img/v2/lng_normal.png")');
	} else {
		$('#lng_open1').slideDown(speed);
		//$('a#lng-menu-icon').css('background-image','url("../img/v2/lng_active.png")');
	}

	open = !open;
		


}


$(function() {window.scrollTo(0,1);});

$(document).mouseup(function(e) {
				if($(e.target).parent("#lng_open, #lng_open1").length==0) {
					$("#lng_open, #lng_open1").hide();
				}
			});	






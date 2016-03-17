
$(document).ready(function(){
 
    jQuery.fn.rotate = function(degrees) {
        $(this).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
                     '-moz-transform' : 'rotate('+ degrees +'deg)',
                     '-ms-transform' : 'rotate('+ degrees +'deg)',
                     'transform' : 'rotate('+ degrees +'deg)'});
        return $(this);
    };
    $('#redbar').progress();
    
    $('#bluebar').progress();
   
    $('.activating.element')
      .popup()
    ;
});
var rotation = 180;
$('.pull-down').click(function(){
     $('.ui.labeled.icon.sidebar')
      .sidebar('toggle')
    ;
  //$('.header-arg').slideToggle();
  $("#sign").rotate(rotation);
      if(rotation === 180){
        rotation = 360;
    }else{
        rotation = 180;
    }
});
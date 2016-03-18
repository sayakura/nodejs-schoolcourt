
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
    $("#photo-b").click(function(){    
        $('.ui.modal')
          .modal('show')
        ;
    });
    $('#debate').mouseenter(function(){
        $(this).css('background-image','url(/client/img/background/bg.jpg)');
    }).mouseleave(function(){
        $(this).css('background-image','url(/client/img/background/bg2.jpg)');
    });
    
    
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
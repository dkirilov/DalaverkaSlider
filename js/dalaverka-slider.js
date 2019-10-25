/* Dalaverka slider JS */

function dalavChangeSlide(new_slide_id){
   // Just make sure that new slide does exist
   if(!document.getElementById(new_slide_id)){
      return false;
   }

   // Also make sure that new slide does not point to current slide
   var current_id = $("div.dalav-slider div.display div.current").attr("id");
   if(new_slide_id == current_id){
      return false;
   }

   // Updates display
   $("div.dalav-slider div.display div.slide").slideUp(150, function(){
      $(this).removeClass("current");
   }); 
   $("div.dalav-slider div.display div#"+new_slide_id).slideDown(150, function(){
      $(this).addClass("current");
   });

   // Updates pagination
   $("div.dalav-slider div.pagination ul li.pag-slide").removeClass("current"); 
   $("div.dalav-slider div.pagination ul li#pag-"+new_slide_id).addClass("current");
}

function dalavNextSlide(){
  var next_id = $("div.dalav-slider div.display div.current").next().attr("id");
  if(!next_id){
     next_id  = $("div.dalav-slider div.display div.slide").first().attr("id");
  }

  dalavChangeSlide(next_id);
}

function dalavPrevSlide(){
  var prev_id = $("div.dalav-slider div.display div.current").prev().attr("id");
  if(!prev_id){
     prev_id  = $("div.dalav-slider div.display div.slide").last().attr("id");
  }
  
  dalavChangeSlide(prev_id);
}

// Makes possible changing slides from pagination
$("div.dalav-slider div.pagination ul li.pag-slide").click(function(){
    var new_id = $(this).attr("id").replace("pag-", "");
    dalavChangeSlide(new_id);
});

// Prev/Next actions
$("div.dalav-slider div.controls div.left-button button").click(function(){
     dalavPrevSlide();
});
$("div.dalav-slider div.controls div.right-button button").click(function(){
     dalavNextSlide();
});

// Auto advance slides when the mouse is not over the slider
$("div.dalav-slider").ready(function(){
   var is_mouse_over = false;
   $("div.dalav-slider").mouseenter(function(){
      is_mouse_over = true;

      // Shows pagination
      $("div.dalav-slider div.pagination").fadeIn("fast");
      // Shows Prev/Next buttons
      $("div.dalav-slider div.controls button").fadeTo("fast", 1);
   });
   $("div.dalav-slider").mouseleave(function(){
      is_mouse_over = false;

      // Hides pagination
      $("div.dalav-slider div.pagination").fadeOut("fast");
      // Hides Prev/Next buttons
      $("div.dalav-slider div.controls button").fadeTo("fast", 0.4);
   });

   setInterval(function(){
     if(!is_mouse_over){
        dalavNextSlide();
     }
   }, 4200);
});

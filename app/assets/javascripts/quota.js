$(function(){
  
  let i = 0;

  $(".quota").on('click', clicked);
  function clicked(){
    $(".add").remove();
    spin();
  }
  function spin(){
    i = 1;
    $(".devider").addClass("active");
    $(".devider").on('transitionend', function(){
      if(i == 1){
        $(".quota").addClass("active");
        $(".menu").addClass("active");
        $(".mask").removeClass("hidden");
      }
    })
    $(".mask").on('click', function(){
      i = 0;
      $(".mask").addClass("hidden");
      $(".quota").removeClass("active");
      $(".menu").removeClass("active");
      $(".devider").removeClass("active");
      $('.comment_box').addClass('hidden');
    })

  }
})
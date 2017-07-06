$(document).ready(function() {


  //parse current url
  {
    var currentURL = window.location.pathname.substr(1);

    if (currentURL.length <= 1) {
      var currentURL = 'index';
    }
    loadState(currentURL);
  }

  //changes content of the page accordingly to state required
  //adds some styling while loading and after done
  function loadState(currentURL){
    $(".content").addClass("content-blurr");
    $(".spinner").removeClass("spinner-stop");
    $("li").removeClass("active");
    $('a[href="'+currentURL+'"]').closest("li").addClass("active");
    $.get( "html/" + currentURL + ".html", function( data ) {
      $( ".content" ).html( data );
    });
    $(".content").removeClass("content-blurr");
    $(".spinner").addClass("spinner-stop");
  }

  //response for a link in navigation clicked
  $( "a" ).on("click", function(event){
    event.preventDefault();
    var currentURL = $(this).attr("href").split(".")[0]
    history.pushState("", "", currentURL);
    loadState(currentURL);

 });
});

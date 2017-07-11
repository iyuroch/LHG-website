

//styling while ajax'ing blogger
{
$(".content").addClass("content-blurr");
$(".spinner").removeClass("spinner-stop");
}

var recData;


//response for click on for detailed info - creates and pop modal with info
$('#myModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget);
  var itemIndex = button.data('index');
  var modal = $(this);
  var changeName = "content";
  modal.find('.modal-title').text(recData.items[itemIndex].title);
  modal.find('.modal-body').html(recData.items[itemIndex].content);
  console.log(recData.items[itemIndex].title);
  history.pushState("","", "/" + window.location.pathname.split("/")[1] + "/"+ recData.items[itemIndex].title);
  //location.hash = recData.items[itemIndex].title
});

//changes hash when modal dismissed
$('#myModal').on('hide.bs.modal', function (e) {
  history.pushState("", "", "/" + window.location.pathname.split("/")[1]);
});


$( "ul.list-group > a" ).click(function( event ) {
  event.preventDefault();
});


//ajax blogger and DOM action after response
$.ajax({
  url: "https://www.googleapis.com/blogger/v3/blogs/679169126963230298/posts/search?q=label:" + window.location.href.split("/")[3] + "&key=AIzaSyB32MdE0PmSCK3tgVhVFkv0F1KloTzQSCY",
  }).done(function(data) {
    recData = data
    var array = ''
    $.each( recData.items, function( key, value ) {
      array += ("<li class='list-group-item'><a href='"+location.pathname+'/'+value.title+"' class='btn btn-link' type='button' data-toggle='modal' data-target='#myModal' data-index='"+key+"'>"+value.title+"</></li>");
    });
    $(".content").append("<ul class='list-group'>"+array+"</ul>");

    popModal();

    $(".content").removeClass("content-blurr");
    $(".spinner").addClass("spinner-stop");
  });

//act accordingly to hash URL of the page - if some - pop modal
function popModal(){
  var splicedHash = decodeURI(window.location.pathname.split("/")[2]);

  if (splicedHash.length != 0) {
    $.each( recData.items, function( key, value ) {
      if (splicedHash == value.title){
        $('a[data-index='+key+']').click();
      }
    });
  }
}

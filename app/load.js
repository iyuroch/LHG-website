

//styling while ajax'ing blogger
{
$(".content").addClass("content-blurr");
$(".spinner").removeClass("spinner-stop");
$('.content').after('<div id="myModal" class="modal fade" role="dialog"> <div class="modal-dialog modal-lg"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal">&times;</button> <h4 class="modal-title">Modal Header</h4> </div><div class="modal-body"> <p>Some text in the modal.</p></div><div class="modal-footer"> <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> </div></div></div></div>');
}

var recData;


//response for click on for detailed info - creates and pop modal with info
$('#myModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget)
  var itemIndex = button.data('index')
  var modal = $(this)
  var changeName = "content"
  modal.find('.modal-title').text(recData.items[itemIndex].title)
  modal.find('.modal-body').html(recData.items[itemIndex].content)
  location.hash = recData.items[itemIndex].title
});

//changes hash when modal dismissed
$('#myModal').on('hide.bs.modal', function (e) {
  window.location.hash = ''
});


$( "ul.list-group > a" ).click(function( event ) {
  event.preventDefault();
});


//ajax blogger and DOM action after response
$.ajax({
  url: "https://www.googleapis.com/blogger/v3/blogs/679169126963230298/posts/search?q=label:"+window.location.pathname.substr(1)+"&key=AIzaSyB32MdE0PmSCK3tgVhVFkv0F1KloTzQSCY",
  }).done(function(data) {
    recData = data
    var array = ''
    $.each( recData.items, function( key, value ) {
      array += ("<li class='list-group-item'><a href='"+location.pathname+'#'+value.title+"' class='btn btn-link' type='button' data-toggle='modal' data-target='#myModal' data-index='"+key+"'>"+value.title+"</></li>");
    });
    $(".content").append("<ul class='list-group'>"+array+"</ul>");

    popModal();

    $(".content").removeClass("content-blurr");
    $(".spinner").addClass("spinner-stop");
  });

//act accordingly to hash URL of the page - if some - pop modal
function popModal(){
  var splicedHash = decodeURI(location.hash.substr(1))

  if (splicedHash.length != 0) {
    $.each( recData.items, function( key, value ) {
      if (splicedHash == value.title){
        $('a[data-index='+key+']').click();
      }
    });
  }
}

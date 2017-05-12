$( document ).ready(function() {
  setCardsButtonsEvents();
});

// FORM SHOW IMAGE
function formShowImage(uploadTagId, imgTagId) {
    document.getElementById(uploadTagId).onchange = function () {
        var reader = new FileReader();

        reader.onload = function (e) {
            // get loaded data and render thumbnail.
            document.getElementById(imgTagId).src = e.target.result;
        };

        // read the image file as a data URL.
        reader.readAsDataURL(this.files[0]);
    };
}

// ADD EVENTS TO THE YES - NO BUTTONS
function setCardsButtonsEvents(){

  $('.item:lt(3)').show();
  $('.item:eq(0)').addClass('active');
  $('.item:eq(1)').addClass('next');
  $('.item:eq(2)').addClass('last');

  var control = function (e) {
    $('.active').switchClass('active', e);
    $('.next').switchClass('next', 'active');
    $('.last').switchClass('last', 'next').next().show().addClass('last');
  };

    $('#btn-no').on('click', function(e){
        var li = $('.items li:first-child');
        var data = { id: li.attr("data-id"), date: li.attr("data-date"), type: li.attr("data-type") };

        doAJAXRequest("post", "/lastviewed", function(response){

            control('remove');
            if ($('.items .next').length == 0)
                location.reload();

        }, data);
    });

    $('#btn-yes').on('click', function(e){
        var li = $('.items li:first-child');
        var data = { id: li.attr("data-id"), date: li.attr("data-date"), type: li.attr("data-type") };

        doAJAXRequest("post", "/match", function(response){

            control('save');
            if(response.message == "MATCHED")


            if ($('.items .next').length == 0)
                location.reload();
        }, data);
    });
}

function doAJAXRequest(method, url, successCallback, data) {
    $.ajax({
        method: method,
        url: url,
        success: successCallback,
        error: function (error) {
            console.log(error);
        },
        data: data
    });
}

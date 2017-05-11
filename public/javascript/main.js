$( document ).ready(function() {
  showLastItem();
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

// FORM LAST ITEM
function showLastItem(){
    $('.list-group .pic-profile:last-child').removeClass("sr-only");
}

// ADD EVENTS TO THE YES - NO BUTTONS
function setCardsButtonsEvents(){
    $('#btn-no').on('click', function(e){
        var li = $('.list-group li:last-child');
        var data = { id: li.attr("data-id"), date: li.attr("data-date"), type: li.attr("data-type") };
        doAJAXRequest("post", "/lastviewed", function(response){
            li.remove();
            $('.list-group li:last-child').removeClass("sr-only");
        }, data);
    });

    $('#btn-yes').on('click', function(e){
        var li = $('.list-group li:last-child');
        var data = { id: li.attr("data-id"), date: li.attr("data-date"), type: li.attr("data-type") };
        doAJAXRequest("post", "/match", function(response){
            li.remove();
            $('.list-group li:last-child').removeClass("sr-only");

            if(response.message == "MATCHED")
                alert('OK');

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




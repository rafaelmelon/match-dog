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

$( document ).ready(function() {
  showLastItem();
});

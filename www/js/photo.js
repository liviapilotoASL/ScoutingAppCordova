var pictureSource;   // picture source
var destinationType; // sets the format of returned value

document.addEventListener("deviceready",onDeviceReady,false);

function onDeviceReady() {
  pictureSource=navigator.camera.PictureSourceType;
  destinationType=navigator.camera.DestinationType;

}

// Called when a photo is successfully retrieved
function onPhotoDataSuccess(imageData) {
  var smallImage = document.getElementById('smallImage');
  smallImage.style.display = 'block';
  smallImage.src = "data:image/jpeg;base64," + imageData;
}

// Called when a photo is successfully retrieved
function onPhotoURISuccess(imageURI) {
  var largeImage = document.getElementById('largeImage');
  largeImage.style.display = 'block';
  largeImage.src = imageURI;
}

// A button will call this function
$("#capture-photo-button").click(function() {
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50, destinationType: destinationType.DATA_URL });
    });

 $("#upload-photo-button").click(function() {
  navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, destinationType: destinationType.FILE_URI, sourceType: pictureSource.PHOTOLIBRARY });
 });

// Called if something bad happens.
function onFail(message) {
  alert('Failed because: ' + message);
}
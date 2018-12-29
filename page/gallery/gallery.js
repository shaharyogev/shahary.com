
let photosCount = new Array();
let countPhotosPosition = 0;
let nextImageXX = 0;
let absCount = 0;
let photosStripNum = new Array();
const photosNumber = 5;
let srcIs;
let galleryIsOnIO = 0;

let addThosePhotos = ["/page/gallery/photos/6.jpg", "/page/gallery/photos/7.jpg", "/page/gallery/photos/8.jpg", "/page/gallery/photos/9.jpg", "/page/gallery/photos/10.jpg"];

function galleryIsOn(){
  if(galleryIsOnIO === 0){
    getPhotos();
  }
}



function addPhotos() {
  photosCount = photosCount.concat(addThosePhotos);
  
}

function getPhotos() {
  srcIs = document.getElementById("mainPhoto");
  for (let i = 1; i <= photosNumber; i++) {
    photosCount.push(document.getElementById("p" + i).getAttribute("src"));
    
  }
  console.log('test');
  addPhotos();
}
/*
window.onload = function(){
  srcIs = document.getElementById("mainPhoto");
  if(srcIs !== null){
  getPhotos();
  }
}

*/


function nextImage(nextImageXX) {
  countPhotosPosition += nextImageXX;
  if (countPhotosPosition < photosCount.length - 1 && countPhotosPosition > -photosCount.length + 1) {
    countPhotosPosition++;
    if (countPhotosPosition < 0) {
      srcIs.src = photosCount[photosCount.length - Math.abs(countPhotosPosition)];
      changePhotosStrip();
    } else {
      srcIs.src = photosCount[Math.abs(countPhotosPosition)];
      srcIs.style.transitionDelay = "1s ";
      changePhotosStrip();
    }
  } else {
    countPhotosPosition = 0;
    srcIs.src = photosCount[countPhotosPosition];
    changePhotosStrip();
  }
  abso();
}


//This function in charge on the left arrow to change the main photo in the gallery to the last photo
function backImage() {
  if (countPhotosPosition < photosCount.length - 1 && countPhotosPosition > -photosCount.length + 1) {
    countPhotosPosition--;
    if (countPhotosPosition < 0) {
      srcIs.src = photosCount[photosCount.length - Math.abs(countPhotosPosition)];
      changePhotosStrip();
    } else {
      srcIs.src = photosCount[Math.abs(countPhotosPosition)];
      changePhotosStrip();
    }
  } else {
    countPhotosPosition = 0;
    srcIs.src = photosCount[countPhotosPosition];
    changePhotosStrip();
  }
  abso();
}

/** I thought on this idea in the end of the project, you can base all the functions base on this absCount **/
function abso() {
  if (countPhotosPosition < 0) {
    absCount = photosCount.length - Math.abs(countPhotosPosition);
  } else {
    absCount = countPhotosPosition;
  }
}


function changePhotosStrip() {
  if (countPhotosPosition > 0 && countPhotosPosition < photosNumber) {
    for (let x = 0; x < (photosNumber); x++) {
      document.getElementById("p" + (x + 1)).src = photosCount[x + Math.abs(countPhotosPosition)];
    }
  } else if (countPhotosPosition >= photosNumber) {
    for (let y = 0; y < (photosCount.length - countPhotosPosition); y++) {
      document.getElementById("p" + (y + 1)).src = photosCount[Math.abs(countPhotosPosition + y)];
    }
    for (let z = photosNumber - countPhotosPosition + photosNumber + 1; z <= photosNumber; z++) {
      document.getElementById("p" + (z)).src = photosCount[Math.abs(z + countPhotosPosition - photosCount.length - 1)];
    }
  } else if (countPhotosPosition < 0 && countPhotosPosition > -photosNumber) {
    for (let c = 0; c < (Math.abs(countPhotosPosition)); c++) {
      document.getElementById("p" + (c + 1)).src = photosCount[c + photosCount.length + countPhotosPosition];
    }
    for (let d = (Math.abs(countPhotosPosition)); d <= photosNumber + countPhotosPosition + Math.abs(countPhotosPosition) - 1; d++) {
      document.getElementById("p" + (d + 1)).src = photosCount[d - Math.abs(countPhotosPosition)];
    }
  } else if (countPhotosPosition < 0 && countPhotosPosition <= -photosNumber) {
    for (let e = 0; e < (photosNumber); e++) {
      document.getElementById("p" + (e + 1)).src = photosCount[e + photosCount.length + countPhotosPosition];
    }
  } else if (countPhotosPosition == 0) {
    for (let n = 0; n < photosNumber; n++) {
      document.getElementById("p" + (n + 1)).src = photosCount[n];
    }
  }
}

function blinkBlink() {
  $('.circle').removeClass('blink');
  $('.cl' + absCount).addClass('blink');
};



$(function () {
  let cl = $("#circle");
  for (let i = 1; i < photosCount.length; i++) {
    $('#circleStrip').append($('#circle').clone().attr('id', 'circle' + i).attr('class', 'circle ' + 'cl' + i));
  }
});
$(function () {
  $('.cl0').addClass('blink');
  $('.arrowNext, .clearBoxNext, #clearBoxNextStrip, .horizontalPhotos,.arrowBack, .clearBoxBack, #clearBoxBackStrip').click(function blinkBlink() {
    $('.circle').removeClass('blink');
    $('.cl' + absCount).addClass('blink');
  });
});

//Touch functionality


let start = null;

window.addEventListener("touchstart", function (event) {
  if(srcIs !== null){
  if (event.touches.length === 1) {
    //just on finger touched
    start = event.touches.item(0).clientX;
  } else {
    //a second finger hit the screen, abort the touch
    start = null;
  }
  }
});

window.addEventListener("touchend", function (event) {
  if(srcIs !== null){
  let offset = 100; //at least 100px are a swipe
  if (start !== 0) {
    //the only finger that hit the screen left it
    let end = event.changedTouches.item(0).clientX;
    if (end > start + offset) {
      nextImage(0);
      blinkBlink();
      //a left -> right swipe
    }
    if (end < start - offset) {
      //a right -> left swipe
      backImage();
      blinkBlink();
    }
  }
}
});

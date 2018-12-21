
let menuOpen = 0;
let menuClass;

document.body.addEventListener("click", menuXX);

function menuX(x, st) {
  x.classList.toggle("change");
  menuClass = x;
  if(menuOpen === 0 ){
    st = setTimeout(function(){menuOpen = 1;}, 200);
  }else{
    menuOpen = 0;
  }
}

function menuXX(){
  if(menuOpen === 1 ){
    menuX(menuClass);
  };
}



const style = document.documentElement.style;


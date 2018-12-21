
let menuOpen = 0;
let menuClass;
const style = document.documentElement.style;


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

function themeToggle(id, value){
  let rootColors =[{tc: 'white', tb:'black', te:'white'}] ;

  
  style.setProperty('--' + id, value);
}




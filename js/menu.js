
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

function themeColors(light, dark) {
  let rootColors = [{
      tc: light
    },
    {
      tb: dark
    },
    {
      te: light
    }
  ];
  for (index in rootColors) {

    let id = Object.getOwnPropertyNames(rootColors[index]);
    //console.log(Object.getOwnPropertyNames(rootColors[index]));
    let value = Object.values(rootColors[index]);
    //console.log(Object.values(rootColors[index]));
    style.setProperty('--' + id, value);
    //console.log(rootColors[index]);
  }
}

function themeToggle(id){
  let themeStateText = document.getElementById(id).innerText
  //console.log(themeStateText)
  if(themeStateText == 'Dark-Side'){
    themeColors('white','black');
    document.getElementById(id).innerText = 'Light-Side';
  }else{
    themeColors('black','white');
    document.getElementById(id).innerText = 'Dark-Side';
  }
}

//themeToggle('black','white')
//themeToggle('white','black')




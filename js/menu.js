
let menuOpen = 0;
let menuClass;
const style = document.documentElement.style;


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
document.body.addEventListener("click", menuXX);


function includeHTML() {
  var z, i, elmnt, file, xhttp,response;
  /*loop through a collection of all HTML elements:*/
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("include-html");
    if (file) {
      /*make an HTTP request using the attribute value as the file name:*/
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /*remove the attribute, and call this function once more:*/
          elmnt.removeAttribute("include-html");
          includeHTML();
        }
      }      
      xhttp.open("GET", file, true);
      xhttp.send();
      /*exit the function:*/
      return;
    }
  }
};




function includeThisHTML(page) {
  var z, i, elmnt, file, xhttp;
    elmnt = document.getElementById("dynamicContent");
    file = page;
    if (file) {
      /*make an HTTP request using the attribute value as the file name:*/
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /*remove the attribute, and call this function once more:*/
        }
      }      
      xhttp.open("GET", file, true);
      xhttp.send();
      z = {indexnew:page};
      history.pushState(z, page, page);
      /*exit the function:*/
      return;
    }
};


function urlBack(){
  let req = window.location.href;
  let end = req.length;
  let base = window.location.origin;
  //console.log(base);
  req = req.slice(base.length, end);
  console.log(req)
  //location.assign(base)
  return req;
};

window.onpopstate = function(event) {
  includeThisHTML(urlBack())
  console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
};




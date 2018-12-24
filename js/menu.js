let menuOpen = 0;
let menuClass;
let renderFinished = 0;
const style = document.documentElement.style;
const homePageDynamicContent = '/page/coding-projects.html'

function searchPath(){
  if (window.location.search !== "") {
    let newPage = window.location.search;
    let newPageLen = newPage.length;
    newPage = newPage.slice(1, newPageLen)
    elmnt = document.getElementById("dynamicContent");
    elmnt.innerHTML = '<div include-html="' + newPage + '" ></div>'
  };
}

function menuX(x, st) {
  x.classList.toggle("change");
  menuClass = x;
  if (menuOpen === 0) {
    st = setTimeout(function () {
      menuOpen = 1;
    }, 200);
  } else {
    menuOpen = 0;
  }
}


//close the menu if the user click anywhere else
function menuXX() {
  if (menuOpen === 1) {
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
    let value = Object.values(rootColors[index]);
    style.setProperty('--' + id, value);
  }
}



function themeToggle(id) {
  let themeStateText = document.getElementById(id).innerText;
  let logoSrc = document.getElementById("logo");
  //console.log(themeStateText)
  if (themeStateText == 'Dark-Side') {
    themeColors('white', 'black');
    document.getElementById(id).innerText = 'Light-Side';
    logoSrc.src = "../files/image/shahar_yogev_logo2.png";
  } else {
    themeColors('black', 'white');
    document.getElementById(id).innerText = 'Dark-Side';
    logoSrc.src = "../files/image/shahar_yogev_logo1.png";
  }
}
document.body.addEventListener("click", menuXX);



function tests() {
  renderFinished = 1;
  console.log('renderFinished: ' + renderFinished);
}



function includeHTML() {
  document.getElementById("dynamicContent").addEventListener("load", tests());
  var z, i, elmnt, file, xhttp, response;
  /*loop through a collection of all HTML elements:*/
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("include-html");
    if (file) {
      /*make an HTTP request using the attribute value as the file name:*/
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
          }
          if (this.status == 404) {
            elmnt.innerHTML = "Page not found."; //DEV
            //includeThisHTML(homePageDynamicContent)//PRODUCTION
          }
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
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status == 200) {
          elmnt.innerHTML = this.responseText;
        }
        if (this.status == 404) {
          elmnt.innerHTML = "Page not found."; //DEV
          //includeThisHTML(homePageDynamicContent)//PRODUCTION
        }
        /*remove the attribute, and call this function once more:*/
      }
    }
    xhttp.open("GET", file, true);
    xhttp.send();
    z = {
      shahary: page
    };
    history.pushState(z, '?' + page, '?' + page);
    /*exit the function:*/
    return;
  }
};



window.onpopstate = function (event) {
  if (window.location.pathname !== '/') {
    includeThisHTML(window.location.search)
    //console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
  } else {
    includeThisHTML(homePageDynamicContent)
  }
};

/*
window.onload = function (event) {
  if (window.location.search !== "" && renderFinished === 1) {
    let newPage = window.location.search;
    let newPageLen = newPage.length;
    newPage = newPage.slice(1, newPageLen)
    includeThisHTML(newPage);
  };
};

*/

function reloadFromServer() {
  location.reload(true);
}

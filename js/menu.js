let menuOpen = 0;
let menuClass;
let renderFinished = 0;
const style = document.documentElement.style;
const homePageDynamicContent = '/page/coding-projects.html'
let deviceScreenHeight = screen.height;
let deviceScreenWidth = screen.width;


function searchPath(){
  if (window.location.search !== "") {
    let newPage = window.location.search;
    let newPageLen = newPage.length;
    newPage = newPage.slice(1, newPageLen)
    elmnt = document.getElementById("dynamicContent");
    elmnt.innerHTML = '<div include-html="' + newPage + '" ></div>'
  };
}

//menu X/E 
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

/*css */

function screenResize(){
  let height = window.innerHeight;
  let width = window.innerWidth;
  deviceScreenHeight = height;
  deviceScreenWidth = width;
  style.setProperty('--sh', height + 'px');
  style.setProperty('--sw', width + 'px');
  //postSize();
};
screenResize()
window.addEventListener("resize", screenResize )
//window.addEventListener("resize", postSize)

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
  if (themeStateText == 'Dark-Side') {
    themeColors('white', 'black');
    document.getElementById(id).innerText = 'Light-Side';
    logoSrc.src = "../files/image/shahar_yogev_logo2.svg";
  } else {
    themeColors('black', 'white');
    document.getElementById(id).innerText = 'Dark-Side';
    logoSrc.src = "../files/image/shahar_yogev_logo1.svg";
  }
}
document.body.addEventListener("click", menuXX);



function divHeight(firstClass){
  let thisHeight =  firstClass.offsetHeight;
  let divHeightLeft = deviceScreenHeight - thisHeight;
  //let thisWidth = firstClass.offsetWidth;
  //let divWidthLeft = deviceScreenWidth - thisWidth;
  let parentClass = firstClass.parentElement;
  let secondClass = parentClass.children;
  secondClass[1].style.setProperty('height' ,divHeightLeft + 'px');
  //secondClass.style.setProperty('width', divWidthLeft + 'px');
}



function postSize(){
  let x = document.getElementsByClassName("card-header");
  for (i=0; i < x.length; i++){
    divHeight(x[i]);
  }
}

function contentCount() {
  renderFinished += 1 ;
}

function scrollToDiv(linkId){
let linkS = document.getElementById(linkId)
function go(){
  linkS.scrollIntoView()
}
setTimeout(go ,150)
}

function scrollToContactMe(){
  function go(){
    document.getElementById('contact_me').scrollIntoView()
  }
  setTimeout(go ,150)
}


/*content*/

function includeHTML() {
  document.getElementById("dynamicContent").addEventListener("load", contentCount());
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
            //elmnt.innerHTML = "Page not found."; //DEV
            includeThisHTML(homePageDynamicContent)//PRODUCTION
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
  
  if(renderFinished == 5){
    postSize();
  }
  renderFinished = 0;
  
};



function includeThisHTML(page) {
  var z, pagePath, elmnt, file, xhttp;
  elmnt = document.getElementById("dynamicContent");
  if(page === 'home'){
    file = homePageDynamicContent;
    pagePath = '/';
  }
  else{
    file = page;
    pagePath = '?' + file;
  }

  if (file) {
    /*make an HTTP request using the attribute value as the file name:*/
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status == 200) {
          elmnt.innerHTML = this.responseText;
        }
        if (this.status == 404) {
          //elmnt.innerHTML = "Page not found."; //DEV
          includeThisHTML(homePageDynamicContent)//PRODUCTION
        }
        /*remove the attribute, and call this function once more:*/
      }
    }
    xhttp.open("GET", file, true);
    xhttp.send();
    z = {
      shahary: page
    };
    history.pushState(z, z, pagePath );
    /*exit the function:*/
    setTimeout(postSize, 50);
    return;
  }
  
};



window.onpopstate = function (event) {
  if (window.location.pathname !== '/') {
    includeThisHTML(window.location.search);
  } else {
    includeThisHTML(homePageDynamicContent);
    setTimeout(postSize, 50);
    galleryIsOnIO = 0;
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

function toggleFullScreen() {
  var doc = window.document;
  var docEl = doc.documentElement;

  var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
  var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

  if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
    requestFullScreen.call(docEl);
  }
  else {
    cancelFullScreen.call(doc);
  }
}


//need to fix the timing ------------------------------------------------------

window.onload = function() {
  
  globalVariables ();
};
  

/*

submitClick.onsubmit = function(){
  event.preventDefault();	

  sendInfo(contactFromId);
};
*/

// send the info to url and validate the info before sending
function sendInfo(){
  event.preventDefault();

  const formId = document.getElementById('contact_me');
	//let formId = id;
	let formDataNode = formId.querySelectorAll('input');
	let formAction = formId.action;
	let nameTest = formId.querySelector('input[name="name"]');
	let emailTest = formId.querySelector('input[name="email"]');
  let phoneTest = formId.querySelector('input[name="phone"]');
  let formError = formId.getElementById('contactFormError');
	let test = 0;
  
  if (emailTest != undefined) {
		let re =
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		let res = re.test(String(emailTest.value).toLowerCase());
		if (!res) {
			formId.querySelector('.error').innerHTML = 'Sorry but you can\'t use this email, try a real one';
			test++;
		}
	}

	if (nameTest != undefined) {
		let re =
			/^[\W \D \S ]{3,100}$/;
		let res = re.test(String(nameTest.value));  
		if (!res) {
			formId.querySelector('.error').innerHTML =
				'The customer name must be at least 3 character long ';
			test++;
		}
	}

	if (phoneTest != undefined) {
		let re =
			/^[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{1,6}$/;
		let res = re.test(String(phoneTest.value));
		if (!res) {
			formId.querySelector('.error').innerHTML =
				'Phone number ex: 000-000-000000). ';
			test++;
		}
	}

  if (test > 0) {
		test = 0;
		return false;
	} else {
		postForm(formAction, formDataNode, id, nextNum);
	}

}


function postForm(page, formDataNode, id, nextNum) {
	let i, xhttp, formData;

	formData = new FormData();
	for (i in formDataNode) {
		formData.append(formDataNode[i].name, formDataNode[i].value);
	}

	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4) {
			if (this.status == 200) {
				if (this.response.startsWith('<!DOCTYPE html>')) {
					document.open();
					document.write(this.responseText);
					document.close();
				} else {
					contentToView(this.responseText);
					goToRentTabWithEmail(id, nextNum);
				}
			}
			if (this.status == 404) {
				contentToView({
					'title': 'We have a little problem'
				});
			}
		}
	};
	xhttp.open('POST', page, true);
	xhttp.send(formData);
}

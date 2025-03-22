window.onload= init;

function init(){
	getFile('getfeed.php');
}

function getHTTPObject() {
  var xhr = false;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    try {
      xhr = new ActiveXObject("Msxml2.XMLHTTP");
    } catch(e) {
      try {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      } catch(e) {
        xhr = false;
      }
    }
  }
  return xhr;
}

function getFile(url) {
  var request = getHTTPObject();
  if (request) {
    request.onreadystatechange = function() {
      displayResponse(request);
    };
    request.open("GET", url, true);
    request.send(null);
  }
}

function displayResponse(request) {
  if (request.readyState == 4) {
    if (request.status == 200 || request.status == 304 ) {
     	 // alert(request.responseXML);
      	var xml = request.responseXML;
      	var items = xml.getElementsByTagName('item');
	var contentDiv = $('#content');
	contentDiv.html(" dasfjdlasj s");
	alert(items[0].innerHTML);
     	
		
      	
   }
      
  }
} // end function

		

		
	
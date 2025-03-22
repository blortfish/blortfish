window.onload= init;

function init(){
	// upload your proxy server and put your own URL in here
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
      	var xml = request.responseXML;
		var content = document.getElementById('content');
      	var items = xml.getElementsByTagName('item');
	
		for(var i=0; i<items.length; i++){
		var title = items[i].getElementsByTagName('title')[0].firstChild.nodeValue;
		var date = items[i].getElementsByTagName('pubDate')[0].firstChild.nodeValue;
		var url = items[i].getElementsByTagName('link')[0].firstChild.nodeValue;
		var description = items[i].getElementsByTagName('description')[0].firstChild.nodeValue;
		
		var nTitle = document.createElement('a');
		nTitle.setAttribute('href', url);
		nTitle.setAttribute('class', 'newsItemTitle');
		var nDate = document.createElement('p');
		var desc = document.createElement('p');
	
		nTitle.innerHTML = title;
		nDate.innerHTML = date;
		desc.innerHTML = description;
		
		content.appendChild(nTitle);
		content.appendChild(nDate);
		content.appendChild(desc);
	    content.appendChild(document.createElement('hr'));
		
		}	  	
   } 
  }
} // end function

		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		

		
	
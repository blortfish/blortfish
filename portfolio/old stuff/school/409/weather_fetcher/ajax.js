window.onload= init;

function init(){
	// upload your proxy server and put your own URL in here
	getFile('getweather.php?zip=14450');
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
     	 //alert(request.responseXML);
      	var xml = request.responseXML;
		var location = xml.getElementsByTagNameNS('*','location')[0].getAttribute('city');
		var date = xml.getElementsByTagNameNS('*', 'condition')[0].getAttribute('date');
		var temp = xml.getElementsByTagNameNS('*', 'condition')[0].getAttribute('temp');
		var item = xml.getElementsByTagName('item')[0];
		var paragraph = document.createElement('p');
    	var latElement = item.getElementsByTagNameNS('*','lat')[0];
		var longElement = item.getElementsByTagNameNS('*','long')[0];
		var desc = item.getElementsByTagName('description')[0].firstChild.nodeValue;
		var description = document.createElement('div');
    	var lat = latElement.firstChild.nodeValue;
		var long = longElement.firstChild.nodeValue;
		var content = document.getElementById('content');
		var em = document.createElement('em');

		paragraph.appendChild(document.createTextNode(location +': ' + date+',     ' +'It is: '+temp+'F'));
		content.appendChild(paragraph);
		description.innerHTML = desc;
		em.appendChild(document.createTextNode("Latitude: " + lat + "  " + "Longitude: " + long));
		content.appendChild(description);
		description.appendChild(em);
		content.setAttribute('style',  'background-color: #034769;margin-top:25px; border:medium dashed white;padding:15px;');
		description.setAttribute('style', 'background-color:#63ADD0; padding:10px');
		paragraph.setAttribute('style', 'color:white;');
		em.setAttribute('style', 'color:white; font-family:verdana;');		
   }
      
  }
} // end function

		

		
	
window.onload= init;

function init(){
	document.getElementById("choose_city").onchange = function(){grabWeather(this.value)};
}

function grabWeather(zip) {
	var url = "getweather.php?zip=" + zip
  var request = getHTTPObject();
  if (request) {
    request.onreadystatechange = function() {
      grabWeatherResponse(request);
    };
    request.open("GET", url, true);
    request.send(null);
  }
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

function grabWeatherResponse(request) {
  if (request.readyState == 4) {
    if (request.status == 200 || request.status == 304 ) {
     	var item = request.responseXML.getElementsByTagName('item')[0];
     	var title = item.getElementsByTagName('title')[0].firstChild.nodeValue;
     	var left = document.getElementById('left');
		left.innerHTML = "";

    	var titleElement= document.createElement('h');
    	titleElement.appendChild(document.createTextNode(title));
    	left.appendChild(titleElement);
		
     	if (item.getElementsByTagNameNS('*','condition').length > 0){
     		var condition = item.getElementsByTagNameNS('*','condition')[0];
     		var date = condition.getAttribute('date');
     		var temp = condition.getAttribute('temp');
     		var text = condition.getAttribute('text');
     		var description = item.getElementsByTagName('description')[0].firstChild.nodeValue;
    		var dateElement= document.createElement('p');
    		dateElement.appendChild(document.createTextNode(date));
    		left.appendChild(dateElement);	
    		var tempElement= document.createElement('p');
    		tempElement.appendChild(document.createTextNode(temp + " degrees"));
    		left.appendChild(tempElement);
    		var textElement= document.createElement('p');
    		textElement.appendChild(document.createTextNode(text));
    		left.appendChild(textElement);
    		var descriptionElement= document.createElement('div');
    		descriptionElement.innerHTML = description;
    		left.appendChild(descriptionElement);
    		
    	}
    }
  }
}


		

		
	
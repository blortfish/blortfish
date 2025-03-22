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
     	 // alert(request.responseXML);
      	var xml = request.responseXML;
		
		var feedTitle = xml.getElementsByTagName('title')[0].firstChild.nodeValue;
		var h1 = document.createElement('h1');
		h1.appendChild(document.createTextNode(feedTitle));
		
		var content = document.getElementById('content');
		content.appendChild(h1);
      	var items = xml.getElementsByTagName('item');
     //	alert("There are " + items.length + " articles!");
		
      	for (var i=0; i< items.length;i++){
			//get titles in array
      		var title = items[i].getElementsByTagName('title')[0].firstChild.nodeValue;
			//grab description
			var description = items[i].getElementsByTagName('description')[0].firstChild.nodeValue;
			//create h2 for each heading
			var heading = document.createElement('h2');
			//grab date info
			var date = items[i].getElementsByTagName('pubDate')[0].firstChild.nodeValue;
			//create em for date
			var emdate = document.createElement('em');
			//create paragraph for description
			var desc = document.createElement('p');
			//create horizontal rule for bottom of each item
			var hr = document.createElement('hr');
			//append titles to heading
			heading.appendChild(document.createTextNode(title));
			//append headings to content
			content.appendChild(heading);
			// append horizontal rule
			content.appendChild(hr);
			//create em text with date
			emdate.appendChild(document.createTextNode(date))
			//add pdate to content
			content.appendChild(emdate);
			//set description text 
			desc.innerHTML = description;
			//append descpriont paragraph
			content.appendChild(desc);		
      	}
    	
		
		
      	
   }
      
  }
} // end function

		

		
	
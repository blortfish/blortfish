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
		var prodfeed = document.getElementById('prodfeed');
      	var items = xml.getElementsByTagName('item');
		
		
      	for (var i=0; i< 4;i++){
			//get titles in array
      		var title = items[i].getElementsByTagName('title')[0].firstChild.nodeValue;
			//grab description
			var description = items[i].getElementsByTagName('description')[0].firstChild.nodeValue;
			//create h2 for each heading
			var heading = document.createElement('a');
			//grab date info
			var date = items[i].getElementsByTagName('pubDate')[0].firstChild.nodeValue;
			//create em for date
			var emdate = document.createElement('em');
			//create paragraph for description
			var desc = document.createElement('p');
			var brk = document.createElement('br');
			var rule = document.createElement('hr');
			var url = items[i].getElementsByTagName('link')[0].firstChild.nodeValue;
			heading.setAttribute('href', url);
			
			if(i > 0){
				prodfeed.appendChild(rule);
			}
			
			heading.appendChild(document.createTextNode(title));
			//append headings to prodfeed
			prodfeed.appendChild(heading);
			prodfeed.appendChild(brk);
			//create em text with date
			emdate.appendChild(document.createTextNode(date))
			//add pdate to prodfeed
			prodfeed.appendChild(emdate);
			//set description text 
			desc.innerHTML = description;
			//append descpriont paragraph
			prodfeed.appendChild(desc);		
			if(i >= 0){
				prodfeed.appendChild(rule);
			}
      	}
    	
		
		
      	
   }
      
  }
} // end function

		

		
	
window.onload = init

function init () {
  //alert("init called");
  var myForm = document.getElementById('myform')
  var button = document.getElementById('mybutton')
  document.getElementById('mybutton').onclick = function () {
    grabFeed(getRadioValue(myForm))
  }

}

function getRadioValue (formElement) {
  for (var index = 0; index < formElement.choice.length; index++) {
    if (formElement.choice[index].checked) {
      return formElement.choice[index].value
    }
  }
}

function grabFeed (feedName) {
  //alert(feedURL);
  var url = 'files/' + feedName
  var request = getHTTPObject()
  if (request) {
    request.onreadystatechange = function () {
      grabFeedResponse(request)
      //   alert(request.readyState);
    }
    request.open('GET', url, true)
    request.send(null)
  }
}

function getHTTPObject () {
  var xhr = false
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest()
  } else if (window.ActiveXObject) {
    try {
      xhr = new ActiveXObject('Msxml2.XMLHTTP')
    } catch (e) {
      try {
        xhr = new ActiveXObject('Microsoft.XMLHTTP')
      } catch (e) {
        xhr = false
      }
    }
  }
  return xhr
}

function grabFeedResponse (request) {
  if (request.readyState == 4) {
    if (request.status == 200 || request.status == 304) {
      //alert(request.responseText);
      var xml = request.responseXML
      var contentDiv = document.getElementById('content')
      contentDiv.innerHTML = ''
      var title = xml.getElementsByTagName('title')[0].firstChild.nodeValue
      //alert(title);
      var titleobj = document.createElement('h2')
      titleobj.appendChild(document.createTextNode(title))
      contentDiv.appendChild(titleobj)

      // feed title
      var desc = xml.getElementsByTagName('description')[0].firstChild.nodeValue

      var descobj = document.createElement('div')
      descobj.appendChild(document.createTextNode(desc))
      contentDiv.appendChild(descobj)

      // feed description
      var link = xml.getElementsByTagName('link')[0].firstChild.nodeValue
      var p = document.createElement('p')
      //alert(title);

      var linkobj = document.createElement('a')
      linkobj.appendChild(document.createTextNode(link))
      p.appendChild(linkobj)
      contentDiv.appendChild(p)

      // feed link

      contentDiv.appendChild(document.createElement('hr'))
      contentDiv.appendChild(document.createElement('hr'))
      contentDiv.appendChild(document.createElement('hr'))

      // LOOP through items
      items = xml.getElementsByTagName('item')
      // feed title

      for (i = 0; i < items.length; i++) {
        //alert(items[i])
        var titles = xml.getElementsByTagName('title')[i].nodeValue
        //alert(titles);
        var titlesobj = document.createElement('h4')

        /* get titles from items 
           create h4 for each title 
           append titles to h4
           append h4 to content
         */
      }

      // feed description

      var descobj = document.createElement('div')
      contentDiv.appendChild(descobj)
      /* get desc from items 
         create div for each description 
         append description to div
         append div to content
       */
      // feed link
      var linkobj = document.createElement('a')
      contentDiv.appendChild(linkobj)

      /* get link from items 
         create a and p for each link
        append link to a
        append a to p
         append a to conententdiv
       */

      // lat and long - Earthquake Only
      // if earthquake

      // alertLevel - Volcano Only
      // if volcano

      contentDiv.appendChild(document.createElement('hr'))

      // end LOO

    }
  }
}

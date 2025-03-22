
var genreDropDown = document.createElement('select');
var yearDropDown = document.createElement('select');
var movieDropDown = document.createElement('select');

genreDropDown.id = "genreDrop";
yearDropDown.id = "yearDrop";
movieDropDown.id = "movieDrop";
  
var xdr;
var genres;
var years = new Array();
var movies;
var minYear;
var maxYear;

function init()
{
    if(isIE)
    {
        //Message to users with a browser below IE v7
        if(verIE == 0)
        {
            var about = document.getElementsByTagName('h1')[0];
            about.firstChild.nodeValue = "You must update your browser to use this page. Please update to at least Internet Explorer 7";
        }
        //performs first request to gather all genres in the API
        else{
            xdr = new XDomainRequest();
            xdr.onload=function()
            {
                parseDataGenre();
            }
            xdr.open("GET", "http://api.themoviedb.org/3/genre/list?api_key=0f4ec7732f566da3f0a0dbfc6917a688");
            xdr.send();
        }
    }//endif IE
    
    else
    {
        //performs first request to gather all genres in the API for non-IE
        xdr = new XMLHttpRequest();
        xdr.open("GET", "http://api.themoviedb.org/3/genre/list?api_key=0f4ec7732f566da3f0a0dbfc6917a688");
        xdr.setRequestHeader("Accept", "application/json");
        xdr.send(null);
        xdr.onreadystatechange =
        function() {
            if(xdr.readyState == 4)
            {
                parseDataGenre();
            }
        }
    }
}


//Generates and adds first dropdown menu with genres 
function parseDataGenre()
{
    //builds array from jsonp input
    genres = eval('(' + xdr.responseText + ')');
    genres = genres.genres;
    var option = document.createElement('option');
    option.appendChild(document.createTextNode("--Select a Genre--"));
    genreDropDown.appendChild(option);
    
    //adds all genre names with respective API ids
    for(var i=0;i<genres.length;i++)
    {
        var option = document.createElement('option');
        option.appendChild(document.createTextNode(genres[i].name));
        var id = genres[i].id;
        option.value=id;
        genreDropDown.appendChild(option);
    }
    genreDropDown.onchange = function()
    {   
        clearFields();
        getYears(genreDropDown.options[this.selectedIndex].value);
        
    };
    document.getElementById('dropDowns').appendChild(genreDropDown);

    
}

//Makes second request for a list of movies based on the id r/c from the genre dropdown menu
function getYears( id )
{
    var genreID = id;
    var xdr2;
    if(isIE)
    {
        xdr2 = new XDomainRequest();
        
        xdr2.onload=function()
        {
            getCurrentMovieList(xdr2.responseText);
        }
        
        xdr2.open("GET", "http://api.themoviedb.org/3/genre/"+genreID+"/movies?api_key=0f4ec7732f566da3f0a0dbfc6917a688");
        xdr2.send();
    
        
    }//end if IE
    
    else
    {
        xdr2 = new XMLHttpRequest();
        xdr2.open("GET", "http://api.themoviedb.org/3/genre/"+genreID+"/movies?api_key=0f4ec7732f566da3f0a0dbfc6917a688");
        xdr2.setRequestHeader("Accept", "application/json");
        xdr2.send(null);
        xdr2.onreadystatechange =
        function() {
            if(xdr2.readyState == 4)
            {
                getCurrentMovieList(xdr2.responseText);
            }
        }
    }
}

//Dynamically generates years based on the current list of movies.
//Gets largest year value and min value to generate range of years
function getCurrentMovieList( movieRequest )
{
    movies = eval('('+movieRequest+')');
    movies = movies.results;
    if(movies.length == 0)
    {
        alert('No movies of this Genre');
    }
    else{
        for(var i=0; i < movies.length; i++)
        {
            years[i] = movies[i].release_date.substring(0,3);
        }
        minYear = Math.min.apply(null, years);
        maxYear = Math.max.apply(null, years);
        
        buildYears();
    }
}

//Creates and appends year dropdown menu
function buildYears()
{
    //clears what was previously in dropdown menu if the dropdown menu exists
    if(document.getElementById('yearDrop'))
    {
        while ( document.getElementById('yearDrop').hasChildNodes())
        {
             document.getElementById('yearDrop').removeChild( document.getElementById('yearDrop').lastChild);
        }
    }
    
    //will be performed if there was only one movie returned for that range of years
    if(movies.length == 1)
    {
        var startYear = minYear * 10;
        var option = document.createElement('option');
        option.appendChild(document.createTextNode(startYear + " - present" ));
        option.value = startYear + " - present" ;
        yearDropDown.appendChild(option);
        if(!document.getElementById('yearDrop'))
        { 
            document.getElementById('dropDowns').appendChild(yearDropDown);
        }
        getMovies(yearDropDown.options[0].value);
    }
    else
    {
        //creates the dropdown menu by making a range of years 10 years apart
        var startYear = minYear * 10;
        var endYear = maxYear * 10;
        
        var option = document.createElement('option');
        option.appendChild(document.createTextNode("--Select a Year--"));
        yearDropDown.appendChild(option);
        
        for(var i=0;i<years.length;i++)
        {
            while(startYear < endYear)
            {
                var option = document.createElement('option');
                option.appendChild(document.createTextNode(startYear + " - " + (startYear+9)));
                option.value = startYear+""+(startYear+9);
                yearDropDown.appendChild(option);
                startYear+=10;
            }
        }
        var option = document.createElement('option');
        option.appendChild(document.createTextNode(startYear + " - present" ));
        yearDropDown.appendChild(option);
    }
    
    yearDropDown.onchange = function()
    {
        getMovies(yearDropDown.options[this.selectedIndex].value);
    };
    //appends if year dropdown if not currently on page
    if(!document.getElementById('yearDrop'))
    { 
        document.getElementById('dropDowns').appendChild(yearDropDown);
    }
}

//creates a list of movies based on user selection. Passes info to build movie dropdown.
function getMovies( yearRange )
{
    var movieList = new Array();
    var yearStart = yearRange.substr(0,4);
    var yearEnd = yearRange.substr(4,9);
    if(yearEnd == " - presen")
    {
        yearEnd = new Date().getFullYear();
    }
    for(var i = 0; i < movies.length;i++)
    {
        var thisYear = movies[i].release_date.substring(0,4);
        if(parseInt(thisYear) >= parseInt(yearStart) && parseInt(thisYear) <= parseInt(yearEnd))
        {
            movieList.push(i);
        }
    }
    buildMovies( movieList);
}

//uses list of movies from stored array to create a dropdown
function buildMovies(list)
{
    if(document.getElementById('movieDrop'))
    {
        while ( document.getElementById('movieDrop').hasChildNodes())
        {
             document.getElementById('movieDrop').removeChild( document.getElementById('movieDrop').lastChild);
        }
    }
    
    //called when no movie exist in the selected year range
    if(list.length==0)
    {
        var option = document.createElement('option');
        option.appendChild(document.createTextNode("No Movies In Selected Range"));
        movieDropDown.appendChild(option);
    }
    
    //if there is only one option, will auto choose the only movie. will also create necessary options
    else if(list.length == 1)
    {
        var option = document.createElement('option');
        option.value = list[0];
        option.appendChild(document.createTextNode(movies[list[0]].title));
        movieDropDown.appendChild(option);
        updateResults(option.value, movies[list[0]].id);
    }
    
    //creates options when there are multiple movies
    else
    {
        var option = document.createElement('option');
        option.appendChild(document.createTextNode("--Select a Movie--"));
        movieDropDown.appendChild(option);
        
        for(var i=0;i<list.length;i++)
        {
            var option = document.createElement('option');
            option.value = list[i];
            option.appendChild(document.createTextNode(movies[list[i]].title));
            movieDropDown.appendChild(option);
        }
        movieDropDown.onchange = function()
        {
            updateResults(movieDropDown.options[this.selectedIndex].value, parseInt(movies[movieDropDown.options[this.selectedIndex].value].id));
        };
    }
    
    //will append the movie drop down if it is not already present
    if(!document.getElementById('movieDrop'))
    {
       document.getElementById('dropDowns').appendChild(movieDropDown);
    }
    
}


//takes index for the movie selection and the API assigned id to change what the user sees displayed
// A third call to the api is necessary to collect more movie-specific. Currently used to get 
// a description of the movie.
function updateResults( index, mv )
{
    var movieBanner = "http://cf2.imgobject.com/t/p/w500/"+movies[index].backdrop_path;
    var movieTitle = movies[index].title;
    var screenTitle = document.getElementById('title');
    var sreenBanner = document.getElementById('banner');
    var screenDesc = document.getElementById('desc');
    var xdr3;
    var desc;
    
    // call for specific data about the chosen movie 
    if(isIE)
    {
        xdr3 = new XDomainRequest();
        xdr3.onload=function()
        {
            desc = eval('('+xdr3.responseText+')').overview;
            
            if(screenDesc.childNodes[0])
            {
                screenDesc.childNodes[0].nodeValue = desc;
            }
            else
            {
                screenDesc.appendChild(document.createTextNode(desc));
            }
            if(screenTitle.childNodes[0])
            {
                screenTitle.childNodes[0].nodeValue = movieTitle;
            }
            else
            {
                screenTitle.appendChild(document.createTextNode(movieTitle));
            }
            sreenBanner.setAttribute('src',  movieBanner);
            storage(movieTitle, movieBanner, desc); 
        }
        xdr3.open("GET", "http://api.themoviedb.org/3/movie/"+mv+"?api_key=0f4ec7732f566da3f0a0dbfc6917a688&append_to_response=releases,trailers");
        xdr3.send();  
    }
    
    else
    {
        xdr3 = new XMLHttpRequest();
        xdr3.open("GET", "http://api.themoviedb.org/3/movie/"+mv+"?api_key=0f4ec7732f566da3f0a0dbfc6917a688&append_to_response=releases,trailers");
        xdr3.setRequestHeader("Accept", "application/json");
        xdr3.send(null);
        xdr3.onreadystatechange =
        function() {
            if(xdr3.readyState == 4)
            {
                desc = eval('('+xdr3.responseText+')').overview;
                if(screenDesc.childNodes[0])
                {
                    screenDesc.childNodes[0].nodeValue = desc;
                }
                else
                {
                    screenDesc.appendChild(document.createTextNode(desc));
                }
                if(screenTitle.childNodes[0])
                {
                    screenTitle.childNodes[0].nodeValue = movieTitle;
                }
                else
                {
                    screenTitle.appendChild(document.createTextNode(movieTitle));
                } 
                sreenBanner.setAttribute('src',  movieBanner);
                storage(movieTitle,  movieBanner, desc);      
            }
        }
    }
    

    
}

//if user changes genre, other dropdown menus are cleared
function clearFields()
{
    if(document.getElementById('movieDrop'))
    {
        while ( document.getElementById('movieDrop').hasChildNodes())
        {
             document.getElementById('movieDrop').removeChild( document.getElementById('movieDrop').lastChild);
        }
        var option = document.createElement('option');
        option.appendChild(document.createTextNode("--Select a Movie--"));
        movieDropDown.appendChild(option);
    }
    
}

//local storage or cookies used to store previously selected movie data
function storage(movieTitle, ban, desc)
{
    if ( window.localStorage )
    {
        localStorage.setItem( 'title', movieTitle);
        localStorage.setItem( 'picture', ban);
        localStorage.setItem( 'description', desc);
    }
    else
    {
        SetCookie('title', movieTitle);
	SetCookie('picture', ban);
        SetCookie('description', desc);
    }
    
    if(verIE ==7 )
    {
        var links = document.getElementById('links');
        var sendLink = document.createElement('a');
        sendLink.setAttribute('id', 'sendMessage');
        sendLink.onclick = function() {sendMessage();};
        sendLink.style.cursor = 'pointer' ;
        sendLink.appendChild(document.createTextNode('Email This Movie'));
        links.appendChild(sendLink);
    }
    else
    {
        if(!document.getElementById('sendMessage'))
        {
            
            var links = document.getElementById('links');
            var sendLink = document.createElement('a');
            sendLink.setAttribute('id', 'sendMessage');
            sendLink.setAttribute('onclick', 'sendMessage();');
            sendLink.style.cursor = 'pointer' ;
            sendLink.appendChild(document.createTextNode('Email This Movie'));
            links.appendChild(sendLink);
        }
        else
        {
            return;
        }
    }
}



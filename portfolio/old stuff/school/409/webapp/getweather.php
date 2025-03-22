<?php
	// Test your code with query string in the browser, something like this:
	// http://people.rit.edu/~abc1234/webapp/getweather.php?zip=14450
	get_weather();
	
//////////////////////////////////////////////////////////////////////////////////////////////////
// Function get_weather()
// A proxy server that will get called by your JavaScript-enabled client
// Returns the yahoo weather RSS feed for the ZIP that was sent over

function get_weather(){
	if ( key_exists('zip',$_REQUEST) && $_REQUEST['zip'] ){
		$url = "http://weather.yahooapis.com/forecastrss?p=" . trim($_REQUEST['zip']);
		header('Content-type: text/xml');
		echo file_get_contents($url);
	}
}


//////////////////////////////////////////////////////////////////////////////////////////////////

?>
<?php
	// Test your code with query string in the browser, something like this:
	// http://people.rit.edu/~abc1234/409/exercises/getfeed.php
	ini_set('allow_url_fopen', 1);
	header('Content-type: text/xml');
	$url = "http://www.tippmannpros.com/rss/catalog/special/store_id/4/cid/0/";
	echo file_get_contents($url);
?>
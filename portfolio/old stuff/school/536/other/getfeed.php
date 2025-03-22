<?php
	ini_set('allow_url_fopen', 1);
	header('Content-type: text/xml');
	$url = "https://www.facebook.com/feeds/page.php?format=rss20&id=296307393788946";
	echo file_get_contents($url);
?>


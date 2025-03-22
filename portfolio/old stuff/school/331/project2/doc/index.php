<!DOCTYPE html>

<html>
	<head>

		<title>Documentation</title>
		<!--IDENTIFIER-->
		<meta property="doc" content="none" />
		
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		
		
		
		

		<!--ADDS HEADER INFORMATION-->
		<?php
			$a = file_get_contents("http://people.rit.edu/def6054/331/project2/global/php_grabs/style_sheets.txt");
			$b = file_get_contents("http://people.rit.edu/def6054/331/project2/global/php_grabs/header_info.txt");
			$c = file_get_contents("http://people.rit.edu/def6054/331/project2/global/php_grabs/scripts.txt");
			echo ($a);
			echo ($b);
			echo ($c);
			?>
			
			
	</head>


	<body>

		<!--BANNER-->
		<?php
			$a = file_get_contents("http://people.rit.edu/def6054/331/project2/global/php_grabs/page_header.txt");
			echo ($a);
			?>	
		<!--NAVIGATION-->		
		<?php
			$a = file_get_contents("http://people.rit.edu/def6054/331/project2/global/php_grabs/nav.txt");
			echo ($a);
			?>

			
			
		<div id="wrapper">
			<h3>Documentation</h3>
			<p>This web presence was made to mimic a real movie site. Due to large file size of the FLV file, I created this site and embedded  a YouTube video that holds the trailer in it.</p>
			<p>The actual FLV version of the trailer uses cue points to mark out the first title screen and the fast paced breakdown of the trailer.
			</p>
			<p>Media for the trailer was taken from the movies V for Vendetta and The Boondock Saints. Both the trailer and actual movie cuts were used. There are a large number of transition effects in use as well to make the
			clip flow more smoothly.</p>
			<p>ActionScript was used to create a toggle button that allows the user to play and pause the movie and it was designed to match the color scheme of the movie.</p>
			
		</div>
			
			
			
			
		<!--FOOTER-->	
		<?php
			$a = file_get_contents("http://people.rit.edu/def6054/331/project2/global/php_grabs/foot.txt");
			echo ($a);
			?>
		<!--CURRENT PAGE SCRIPT-->
			<?php
			$c = file_get_contents("http://people.rit.edu/def6054/331/project2/global/javascript/navigation_script.txt");
			echo ($c);
			?>
			
	</body>
	
	
</html>
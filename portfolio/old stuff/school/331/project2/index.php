<!DOCTYPE html>

<html>
	<head>

		<title></title>
		<!--IDENTIFIER-->
		<meta property="home" content="none" />
		
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		
		
		
		<!--FAVICON-->
		<link rel="icon" type="image/png" href="icon.ico" />

		<!--ADDS HEADER INFORMATION-->
		<?php
			$a = file_get_contents("global/php_grabs/style_sheets.txt");
			$b = file_get_contents("global/php_grabs/header_info.txt");
			$c = file_get_contents("global/php_grabs/scripts.txt");
			echo ($a);
			echo ($b);
			echo ($c);
			?>
			
			
	</head>


	<body>

		<!--BANNER-->
		<?php
			$a = file_get_contents("global/php_grabs/page_header.txt");
			echo ($a);
			?>	
		<!--NAVIGATION-->		
		<?php
			$a = file_get_contents("global/php_grabs/nav.txt");
			echo ($a);
			?>

			
			
		<div id="wrapper">
			
			<div id="trail">
				<iframe border="0px" width="420" height="345"
					src="http://www.youtube.com/embed/LuhkIolL27Q">
				</iframe>
			</div>
			<h2>Plot and Trailer</h2>
			<p>Corruption has overtaken the governemnt and greed is rampant. Jacob Rite and his brother Bryan are willing to
			fight to clean up the streets when they stumble upon the masked man that calls himself 'G'. Both parties posses the same
			goal, freedom.</p><p>G has taken up the fight directly with the governemnt an has plans to aid citizens in a revolt to
			seize power and return citizens to the life they deserve while the two brothers fight the street gangs and mob figures
			that have emerged in this dark time. Together they will fight to reclaim what was once theirs.</p>
			<h4>Exact release date TBD. January 2014</h4>
			
		</div>
			
			
			
			
		<!--FOOTER-->	
		<?php
			$a = file_get_contents("global/php_grabs/foot.txt");
			echo ($a);
			?>
		<!--CURRENT PAGE SCRIPT-->
			<?php
			$c = file_get_contents("global/javascript/navigation_script.txt");
			echo ($c);
			?>
			
	</body>
	
	
</html>
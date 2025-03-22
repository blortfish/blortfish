<!DOCTYPE html>

<html>
	<head>

		<title>Purple Rain Project S.A.R.A.</title>
		<!--IDENTIFIER-->
		<meta property="home" content="none" />
		
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		
		<!-- SLIDER SHEETS/ JS -->	
		<link href="http://people.rit.edu/def6054/426/global/slider/slidecss.css" rel="stylesheet" type="text/css" />
		 <script src="http://people.rit.edu/def6054/426/global/javascript/slider.js" type="text/javascript"></script>

		
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
			
			<h3>What is SARA?</h3>
			<p>
			SARA is your typical refrigerator that doubles as a personal chef!  Through the use of internet recipes, advanced cooking, and state of the art prepping tools, you can program SARA to do the hard work of cooking for you!
			</p>
			
			    <div id="sliderFrame">
				<div id="slider">
				    <img src="http://people.rit.edu/def6054/426/global/media/images/slideshow/1.png" alt="Simple, easy to use home screen." />
				    <img src="http://people.rit.edu/def6054/426/global/media/images/slideshow/2.png" alt="Search the internet for new recipies or pick from your favorites" />
				    <img src="http://people.rit.edu/def6054/426/global/media/images/slideshow/3.png" alt="See when you need to go shopping with the touch of a button." />
				    <img src="http://people.rit.edu/def6054/426/global/media/images/slideshow/4.png" alt="Plan your meals and have them ready when you walk in the door." />
				</div>
			    </div>
			
			<div class="list">
			<h3>Features:</h3>
				<ul>
				<li>Full panel touch screen</li>
				<li>Makes full meals on the fly</li>
				<li>Recipe database to find new recipes</li>
				<li>Create your own recipes</li>
				<li>Tracks ingredients for grocery runs</li>
				<li>Ability to schedule meals in advance</li>
				<li>Real time oven timer</li>
				<li>"Cookbook" option to save favorite recipes</li>
				<li>Voice communication</li>
				<li>Refrigerator/Freezer</li>
				</ul>
			</div>
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
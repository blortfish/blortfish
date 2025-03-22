<!DOCTYPE html>

<html>
	<head>

		<title>Purple Rain Project S.A.R.A.</title>
		<!--IDENTIFIER-->
		<meta property="how" content="none" />
		
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		
		
		<!--ADDS HEADER INFORMATION-->
		<?php
			$a = file_get_contents("http://people.rit.edu/def6054/426/global/php_grabs/style_sheets.txt");
			$b = file_get_contents("http://people.rit.edu/def6054/426/global/php_grabs/header_info.txt");
			$c = file_get_contents("http://people.rit.edu/def6054/426/global/php_grabs/scripts.txt");
			echo ($a);
			echo ($b);
			echo ($c);
			?>
			
			
	</head>


	<body>

		<!--BANNER-->
		<?php
			$a = file_get_contents("http://people.rit.edu/def6054/426/global/php_grabs/page_header.txt");
			echo ($a);
			?>	
		<!--NAVIGATION-->		
		<?php
			$a = file_get_contents("http://people.rit.edu/def6054/426/global/php_grabs/nav.txt");
			echo ($a);
			?>	
		<div id="wrapper">
			
			<h2>How does it work?</h2>
				
				<h3>Features:</h3>
				
				<div class="list">
				<h3>SARA</h3>
				
				<li>Door opens to allow user to put food inside fridge or freezer</li>
				<li>User can store non-refrigerated ingredients such as spices in the side of the unit</li>
				<li>Oven on the bottom of the unit allows food to be cooked without user interaction. </li>
				<li>Front of SARA can be a touch screen by pushing a button on the top, allowing the user to use the UI</li>
				<li>Front of SARA is a see through glass-like panel in it's non touch screen form</li>
				</div>
				
				
				<div class="list">
				<h3>User Interface</h3>
				
				<li>The user may select a recipe by entering the "Cookbook" and browsing through a list of recipes</li>
				<li>Allow wifi searching the web for new recipes</li>
				<li>Ability to import recipes from web pages</li>
				<li>Allows intuitive displaying and interaction of SARA's capabilities through a touch interface</li>
				<li>Allows users to be aware of the status of all food including its quantity and expiration state</li>
				<li>Allows the user to track needed ingredients for grocery runs</li>
				</div>
				
				<div class="list">
				<h3>Components</h3>
				
				<li>Refrigerator/Freezer</li>
				<li>Oven/Microwave</li>
				<li>Notify user about expired/low quantity food via notifications and texting</li>
				<li>Prepares food hot/cold</li>
				<li>Pantry for non-refrigerated foods/spices</li>
				<li>Recipe database</li>
				<li>Internet connected</li>
				<li>Voice communication</li>
				<li>Dynamic opacity touch screen</li>
				</div>
				
				<div class="list">
				<h3>User Interface</h3>
				
				<li>Touch Optimized</li>
				<li>Clock</li>
				<li>Calendar scheduling functionality - "be ready at"</li>
				<li>Create meal on the fly - "cook right now"</li>
				<li>Recipe importing into cookbook from the internet</li>
				<li>Recipe creation</li>
				<li>Cooking timer</li>
				<li>Device status - things cooking, upcoming events, quick inventory view </li>
				<li>Recipe Search</li>
				<li>Cookbook</li>
				<li>Recipe Rating - suggestions</li>
				<li>Notifications of expired food and low inventory</li>
				<li>Food Inventory browsing</li>
				</div>
			
		
		</div>
			
	
		<!--FOOTER-->	
		<?php
			$a = file_get_contents("http://people.rit.edu/def6054/426/global/php_grabs/foot.txt");
			echo ($a);
			?>
		<!--CURRENT PAGE SCRIPT-->
			<?php
			$c = file_get_contents("http://people.rit.edu/def6054/426/global/javascript/navigation_script.txt");
			echo ($c);
			?>
			
	</body>
	
	
</html>
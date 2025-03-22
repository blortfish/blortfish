<!DOCTYPE html>

<html>
	<head>

		<title>Purple Rain Project S.A.R.A.</title>
		<!--IDENTIFIER-->
		<meta property="why" content="none" />
		
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
			<h3>Why choose S.A.R.A. for your kitchen?</h3>
			<p>SARA is equipped with state-of-the-art technology to make your daily life easier.  In Version 1.0, SARA can be used by adults and children with the use of our parental controls so that children can make a quick snack for themselves without any worry from parents!  If you are single and busy all the time, scheduling meals in advance can be perfect so that you can eat a healthy hot meal without any prep work except the push of a button.  Parents with any size family can make an appropriate meal for the whole family!  With wifi recipe search and a recently made meals menu, finding a recipe to cook has never been easier!
			</p>
			<p>This smart device is perfect for anyone and everyone, and it is certain your daily routine will be quicker and more efficient,  Eveyone is on the go contantly in our society today, so why not make you life easier with a autonomous refridgerator and oven?
			</p>
		
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
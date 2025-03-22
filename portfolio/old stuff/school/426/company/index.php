<!DOCTYPE html>

<html>
	<head>

		<title>Purple Rain Project S.A.R.A.</title>
		<!--IDENTIFIER-->
		<meta property="company" content="none" />
		
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
		<h3>Purple Rain Inc.</h3>
		<p>Purple Rain is a technology company out of Rochester, NY.  If you would like to contact us with additional questions or comments, feel free to email us at <a href="mailto:PurpleRainInc.@gmail.com">PurpleRainInc.@gmail.com</a>.
		</p>
		
		
		<h3>Board of Trustees:</h3>
		<ul>
			<li>Nicolette Nugent</li>
			<li>Robert Barns</li>
			<li>Aylannah Dylag</li>
			<li>Daniel Flint</li>
			<li>Daniel Larsen</li>
		</ul>
		<img style="margin: 30px;" src="http://people.rit.edu/def6054/426/global/media/images/purpleRainLogo.png" alt="Logo" />
			
		
		<p id="disclaim"></p>
		
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
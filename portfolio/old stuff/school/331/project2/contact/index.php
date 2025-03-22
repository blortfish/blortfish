<!DOCTYPE html>

<html>
	<head>

		<title>Contact</title>
		<!--IDENTIFIER-->
		<meta property="contact" content="none" />
		
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		
		
		
		<!--FAVICON-->
		<link rel="icon" type="image/png" href="icon.ico" />

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
			<h3>Contact Us</h3>
			<div id="contact_info">
				<p>Feel free to contact us with any fan mail, questions, or suggestions.</p>
				<p><em>Phone: </em>(555) 564-5642</p>
				<p><em>Fax: </em>(555) 454-6721</p>
				<p><em>E-mail: </em>admin@cerberusthemovie.com</p>
				
			</div>
			
			<p id="disclaim">***Please note, this is a fictional movie and will never be released. All media rights go to respective owners.***</p>
			
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
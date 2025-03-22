<!DOCTYPE html>

<html>
	<head>

		<title>Purple Rain Project S.A.R.A.</title>
		<!--IDENTIFIER-->
		<meta property="try" content="none" />
		
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
                    
                    <object width="900" height="500" type="application/x-shockwave-flash" data="http://people.rit.edu/def6054/426/global/final_product/sara213.swf">
                        <param name="movie" value="file.swf" >
                        <embed src="http://people.rit.edu/def6054/426/global/final_product/sara213.swf" width="900" height="500" />
                    </object>


		
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
<!DOCTYPE html>

<html>
	<head>

		<title>Cast</title>
		<!--IDENTIFIER-->
		<meta property="cast" content="none" />
		
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
			<div class="cast">
				
				
				<img width="200px" src="http://people.rit.edu/def6054/331/project2/global/media/norman.jpg" alt="norman" />
				<div class="desc">
					<h3>Norman Reedus</h3>
					<p>Norman's first film was in 1997 the Guillermo del Toro horror thriller film Mimic, where he played the character Jeremy. He has also played roles in the films Floating, Six Ways to Sunday, Deuces Wild, Blade II, Gossip, 8mm, American Gangster, Hero Wanted and Moscow Chill. In 2005 he had a bit-part in the Christian Alvart German film Antibodies as a German Polizist (policeman)...</p>
				</div>
			</div>
			
			<div class="cast">
				
				
				<img width="200px" src="http://people.rit.edu/def6054/331/project2/global/media/sean.jpg" alt="sean" />
				<div class="desc">
					<h3>Sean Patrick Flanery</h3>
					<p>Born in Lake Charles, LA, and raised in Sugar Land, TX, Sean Patrick Flanery attended the University of St. Thomas in Houston, where he took a drama class because of a girl. The girl was a short infatuation, but he found true love in college theater. He moved to Los Angeles and waited tables. He got an agent and after eight months...</p>
				</div>
				
			</div>
			<div class="cast">
				
				
				<img width="200px" src="http://people.rit.edu/def6054/331/project2/global/media/nat.jpg" alt="nat" />
				<div class="desc">
					<h3>Natalie Portman</h3>
					<p>Natalie Portman was born Natalie Hershlag on June 9, 1981 in Jerusalem, Israel to a Jewish 	family. She is the only child of a doctor father (from Israel) and an artist mother (from Cincinnati, Ohio), who also acts as Natalie's agent. She left Israel for Washington, D.C., when she was still very young...</p>
				</div>
				
			</div>
			<div class="cast">
				
				
				<img width="200px" src="http://people.rit.edu/def6054/331/project2/global/media/g.jpg" alt="g" />
				<div class="desc">
					<h3>Hugo Weaving</h3>
					<p>Hugo Wallace Weaving (born 4 April 1960) is a British-Australian film and stage actor. He is best known for his roles as Agent Smith in the Matrix trilogy, Elrond in the Lord of the Rings trilogy, "V" in V for Vendetta, and performances in numerous Australian character dramas . Early life Weaving...</p>
				</div>
				
			</div>

			<p>Credit for cast Bio and photos <a href="http://www.imdb.com">IMDB</a>.</p>
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
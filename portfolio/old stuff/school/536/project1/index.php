<!doctype html>
<html lang='en'>
<head>
	<meta charset='utf-8' />
	<title>Daniel Flint - Project 1</title>
	<link rel='stylesheet' href='style/main.css' type='text/css' />
	<link href='http://fonts.googleapis.com/css?family=Monda' rel='stylesheet' type='text/css'>
        <script type="text/javascript" src="api_script.js"></script>
	<script type="text/javascript" src="cookies.js"></script>
	<script type="text/javascript" src="email.js"></script>
        
</head>
<body onload="init();">

     <!--file contains test for IE and version -->	
     <?php include("ie.html"); ?>
    
    <div id="wrapper">
        <h1>Movie Picker</h1>
	<form action="">
		Name:<input id="un" placeholder="Enter your Name" type="text" name="name">
		Email:<input id="mail" placeholder="Enter your E-Mail" type="text" name="address">
	<input onclick="userInfo()" type="button" value="Submit" >
	</form>
	
	<form id="dropDowns"></form>
	
	<!-- Creates area that script will populate. -->
	<div id="movieInfo">
	    <h2 id="title"></h2>
	    <img alt="" id="banner" src="blank.png" />
	    <p id="desc"></p>
	</div>	

	<div id="links">
        </div>
    </div>
    <!-- FOOTER -->
    <div id="footer">
        Daniel Flint &copy; 2013
    </div>
</body>
</html>

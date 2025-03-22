<! DOCTYPE html>
<html>
    <head>
        <title>Day 2</title>
    </head>
	<body>
	<h1>Hello World</h1>
<?php
	$title="First PHP Program";
	//single line comment
	/* multi line comment
		more comments
	 */
	 #this is also a COMMENT
?>	 
<h1><?php echo "<p>Hi world! - $title</p>";
echo "<br />Name is ".$_GET['name']."</h1>";

$version=phpversion();
 echo "<h2>The version is $version</h2>";
 
 phpinfo();
 
 var_dump($_SERVER);
?>
	</body>
</html>

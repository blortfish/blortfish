<?php
    include('mid.php');
    $mid = new mid();
?>
<!DOCTYPE html>
<html>
<head>
    <title>Hexxagon -- Login</title>
    <meta charset="utf-8">
    <?php include('includes/general/head-refs.inc.php') ?>
</head>
<body>
<?php include('includes/general/header.inc.php'); ?>
<div class="wrapper well login-page" style="color: black;">
    <h2 class="heading">About</h2>
	<span style="line-height: 50px;" ><a href="https://github.com/def6054/hexxagon">GitHub</a></span>
	<h3>Description</h3>
		<p>This project was a final for an RIT course, ISTE.442.01 Web Application Development.</p>
		<p>Hexxagon is a pretty simple game that involves moving your pieces around the board, single space moves
		result in a duplication of your piece, double space moves will jump that piece into position. Upon moving, 
		your piece will capture any opponent pieces that are on the edges of that space</p>

	<p>This project was built purely with php, mysql, javascript, and the board is made with SVG. Source code is freely available on github.</p>
	
	<h3>Known Bugs</h3>
	<ul>
		<li>A user logged in may not always show in online players in the lobby. (login / out to fix)</li>
		<li>Record currently does not get changed with wins/ losses</li>
	</ul>
</div>
	
<?php include('includes/general/foot-includes.inc.php'); ?>
</body>
</html>
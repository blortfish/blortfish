
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>Foundations of Mobile Design - List App</title>
	<?php
	    $basePath = $_SERVER['DOCUMENT_ROOT'];
		include_once("$basePath/assets/includes/utils.php");
        echo includeFonts();
		echo includeBootstrapHeader();
	?>
	<link rel="stylesheet" type="text/css" href="assets/css/style.css">
</head>
<body>
 <div class='container'>
	<h1>452: Foundations of Mobile Design</h1>
	<h5>Tyler Carney, Alex Kaplewicz, Daniel Flint</h5>
	<h3>Mobile List Application</h3>
		<div class="block">
		<div class="container">
			<h4>Goals of this document:</h4>
			<p>Outline a list management app to be built with HTML5 CSS3 and Javascript. Look at competitive applications and features. Inspect the target audience. Describe at a high level how the app should function and store data to ensure a positive user experience.</p>
		</div>
	</div>
</div>
	  <div class="container well">

	<h2>Design Document:</h2>
	<div class="block">
		<h3>Audience:</h3>
		<ul>
			<li>Organized, tech-savy individuals</li>
			<li>Students</li>
			<li>White collar workers</li>
			<li>Busy Moms</li>
		</ul>
	</div>

	<div class="block">
		<h3>Goals:</h3>
		<ul>
			<li>Ability to create, edit, and remove lists of text</li>
			<li>Option to link to external websites</li>
			<li>Sort lists</li>
			<li>Clean, simple UI</li>
		</ul>
	</div>
	
	<div class="block">
		<h3>Competitors:</h3>
		<ul>
			<li>Google Calendar</li>
			<li>Google Tasks</li>
			<li>Evernote</li>
			<li>Reminders (iOS)</li>
		</ul>
	</div>
	Competitors offer functionality to create lists, add timestamps to lists/tasks, organize lists/tasks, and delete lists/tasks. Competitors also allow for multiple views of lists/tasks to help keep the user organized. Information is often synced in the cloud to allow for consistency across multiple devices

	<div class="block">
		<h3>Data:</h3>
		<p>The data should live locally to ensure that a constant network connection is not necessary to view a list.</p>
	</div>
			<h3>Prototype:</h3>
		<div class="block">
		<a href="prototype/"><h3>Click here to see prototype (resize to mobile if you are on desktop)</h3></a>
		</div>
		<h3>Wireframes:</h3>
	<div class="block">
		<div class="wires">
			<img src="assets/images/wire1.png" alt="wire1" />
			<img src="assets/images/wire2.png" alt="wire2" />
		</div>
	</div>

  </div>
</body>
</html>

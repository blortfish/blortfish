<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
?>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>Foundations of Mobile Design - List App</title>
	<?php
		$basePath = $_SERVER['DOCUMENT_ROOT'] . "/";
        include_once($basePath . "assets/includes/utils.php");
        echo includeFonts();
		echo includeBootstrapHeader();
		echo includeJquery();
	?>
    <link rel="icon" type="image/png" href="assets/images/doge.png">
	<link id="stylesheet" rel="stylesheet" type="text/css" href="assets/css/prototype-light.css">
    <link rel="stylesheet" type="text/css" href="assets/css/base.css">
	<link href="http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">
	<script src="assets/js/new-list-functions.js"></script>
	<script src="assets/js/in-list-functions.js"></script>
    <script src="assets/js/menu.js"></script>
	<script src="assets/js/prototype.js"></script>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
</head>

<body>
    <div class="wrapper">
		<div class="header">
			<div class="button button-left">
				<div class="button-inner">
					<i class="fa fa-align-justify"></i>
				</div>
			</div>
			<div class="page-title">
				<span>Nuance</span>
			</div>
			<div class="button button-right">
				<div class="button-inner">
					<i class="fa fa-plus"></i>
				</div>
			</div>
		</div>
		<div class="content">
			<p class="no-list">No Lists</p>
		</div>
    </div>
</body>
</html>
<!DOCTYPE html>
<html>
	<head>
        <title>Map App</title>
        <?php
            $basePath = $_SERVER['DOCUMENT_ROOT'];
            include_once("$basePath/assets/includes/utils.php");
            echo includeFonts();
            echo includeJquery();
        ?>
        <link href="http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
        <link rel="stylesheet" type="text/css" href="assets/css/style.css" />
        <link href='http://fonts.googleapis.com/css?family=Oxygen' rel='stylesheet' type='text/css' />
        <script src="assets/js/data.js"></script>
        <script src="assets/js/open-layers.js" type="text/javascript"></script>
        <script src="assets/js/main.js" type="text/javascript"></script>
        <script src="assets/js/menu.js"></script>
        <script src="assets/js/switch.js"></script>
        <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.2/leaflet.css" />
        <script src="http://cdn.leafletjs.com/leaflet-0.7.2/leaflet.js"></script>
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
		<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/jquery-ui.min.js"></script>
        <script src="assets/js/layer-switches.js"></script>
        <link href="assets/css/switch.css" rel="stylesheet" />
		<script src="assets/js/switch.js"></script>

    </head>
	<body>

		<div class="container">
			<div class="expand-button">
                <span><i class="fa fa-plus"></i>Layers</span>
                <div class="drop-down">
                    <span>Food</span><div class="switch-wrapper">
							<div class="switch">
								<div class="switch-wrapper">
								  <input id="food" type="checkbox" value="1" checked>
								</div>
							</div>
						</div>
                    <span>Shopping</span><div class="switch-wrapper">
							<div class="switch">
								<div class="switch-wrapper">
								  <input  id="shopping" type="checkbox" value="1" checked>
								</div>
							</div>
						</div>						
                    <span>Entertainment</span><div class="switch-wrapper">
							<div class="switch">
								<div class="switch-wrapper">
								  <input  id="entertainment" type="checkbox" value="1" checked>
								</div>
							</div>
						</div>
                    <span>Beer</span><div class="switch-wrapper">
							<div class="switch">
								<div class="switch-wrapper">
								  <input  id="beer" type="checkbox" value="1" checked>
								</div>
							</div>
						</div>												
				</div>
			</div>
            <div id="map"></div>
		</div>
		<script>
      $(function() {
        $('.switch input').switchButton({
		  width: 100,
		  height: 25		  
        });
      })
    </script>
	</body>
</html>


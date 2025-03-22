<?php
// Connect to Database
require "../../../db_conn.php";
$mysqli = new mysqli( $db_host, $db_user, $db_pass, $db_name );

if ( $mysqli->connect_errno ) {
	$error = "Database error: " . $mysqli->connect_errno . " " . $mysqli->connect_error;
}
else {
	// If a new name has been sent, add it to the database
	if ( isset( $_GET['who'] ) ) {
		if ( $stmt = $mysqli->prepare( "INSERT INTO 536AjaxClass SET name=?" ) ) {
			if ( $stmt->bind_param( "s", htmlentities( strip_tags( $_GET['who'] ) ) ) ) {
				$stmt->execute();
			}
		}
	}
	// Get all existing names in the database and generate an XML document
	$result = $mysqli->query( "SELECT name FROM 536AjaxClass" );
	$return = "<?xml version='1.0' standalone='yes'?><info>";
	if ( $result->num_rows > 0 ) {
		while ( $row = $result->fetch_assoc() ) {
			$records[] = $row;
			$return .= "<who>" . $row['name'] . "</who>";
		}
	}
	else {
		$return .= "<who>No one</who>";
	}
	$return .= "</info>";
}

// Prevent caching
header( "Expires: Mon, 26 Jul 1997 05:00:00 GMT" );
header( "Last-Modified: " . gmdate( "D, d M Y H:i:s" ) . " GMT" );
header( "Cache-Control: no-store, no-cache, must-revalidate" );
header( "Cache-Control: post-check=0, pre-check=0", false );
header( "Pragma: no-cache" );

// Specify XML for the content type
header( "Content-Type: text/xml" ); 

// This will become the response value for the XMLHttpRequest object
echo $return; 
?>
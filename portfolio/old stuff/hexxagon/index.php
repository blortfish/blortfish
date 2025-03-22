<?php
ini_set('display_errors',1);  error_reporting(E_ALL);
    include('mid.php');
    $mid = new mid();
    $midPostMessages = $mid->getMidMessages();
?>
<!DOCTYPE html>
<html>
<head>
    <title>ISTE-442.01 -- Hexxagon</title>
    <meta charset="utf-8">
    <?php include('includes/general/head-refs.inc.php') ?>
</head>
<body>
<?php include('includes/general/header.inc.php'); ?>
<div class="wrapper well">
    <h2 class="heading">Lobby</h2>
    <?php include('includes/chat.module.inc.php'); ?>
    <?php include('includes/online-players.module.inc.php'); ?>
</div>
<?php include('includes/general/foot-includes.inc.php'); ?>
</body>
</html>
<?php
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
    <h2 class="heading">Hexxagon</h2>
    <?php include('includes/board.module.inc.php'); ?>
    <div class="in-game"><?php include('includes/chat.module.inc.php'); ?></div>
</div>
<?php include('includes/general/foot-includes.inc.php'); ?>
</body>
</html>
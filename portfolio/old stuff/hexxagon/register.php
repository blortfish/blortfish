<?php
    include('mid.php');
    $mid = new mid();
    $midPostMessages = $mid->getMidMessages();
    $message = $mid->registerNewUser();

    if ($message === true) {
        Lib::emptyPost();
        $message = "<p class='successful-register'>Thank you for registering!<br/>Please login to continue.</p>";
    }
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
<div class="wrapper well login-page">
    <h2 class="heading">Hexxagon Registration</h2>

    <form name="register" method="post">
        <?php if (isset($message)) echo $message; ?>
        <label for="registration-username">Desired Username:<br/><input type="text"
                                                                        name="registration-username"  <?php if (isset($_POST['registration-username'])) echo "value='" . $_POST['registration-username'] . "'"; ?> /></label>
        <label for="registration-email">Email:<br/><input type="text"
                                                          name="registration-email" <?php if (isset($_POST['registration-email'])) echo "value='" . $_POST['registration-email'] . "'"; ?> /></label>
        <label for="registration-password">Password:<br/><input type="password" name="registration-password"/></label>
        <label for="registration-repeat-password">Repeat Password:<br/><input type="password"
                                                                              name="registration-repeat-password"/></label>
        <input type="submit" value="Submit"/>
    </form>
</div>
<?php include('includes/general/foot-includes.inc.php'); ?>
</body>
</html>
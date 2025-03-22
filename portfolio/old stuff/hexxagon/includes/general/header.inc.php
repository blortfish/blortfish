<?php
    $loginForm = <<<LOGIN
    <div class="login">
        <form method="post" name="login">
            <label for="username">Username: <input type="text" id="username" name="username" /></label>
            <label for="password">Password: <input type="password" id="password" name="password" /></label>
            <input class="button gray" value="Login" name="login" type="submit">
        </form>
    </div>
LOGIN;
    $greetingUserName = isset($_SESSION['username']) ? $_SESSION['username'] : "";
    $greeting = <<<GREETING
    <div class="login greeting">
        Welcome, {$greetingUserName}
    </div>
GREETING;


?>

<div class="header">
    <a href="/hexxagon/"><h1>Play Hexxagon</h1></a>

    <div class="header__info">
        <?php
            if (isset($midPostMessages['login-message'])) echo "<p>" . $midPostMessages['login-message'] . "</p>$loginForm";
            else if (isset($_SESSION['isAuth']) && $_SESSION['isAuth'] === true) echo $greeting;
            else echo $loginForm;
        ?><ul class="user-links">
            <?php
                if (!isset($_SESSION['isAuth']) || $_SESSION['isAuth'] !== true) echo '<li><a href="/hexxagon/register.php">Register</a></li>';
                else if (isset($_SESSION['isAuth']) || $_SESSION['isAuth'] === true) echo '<li><a href="/hexxagon/?logout">Log out</a></li>';
            ?>
            <li><a href="/hexxagon/">Lobby</a></li>
            <li><a href="/hexxagon/about.php">About</a></li>
        </ul>
    </div>
</div>


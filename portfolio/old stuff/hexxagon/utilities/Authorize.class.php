<?php

    class Authorize
    {
        private $userData;

        function __construct()
        {
            require_once("_data/user.data.php");
            $this->userData = new UserData();
        }

        function login()
        {
            $userObject = json_decode($this->userData->getUserLoginData($_POST["username"]));
            if (!empty($userObject)) {
                $userObject = $userObject[0];
                if (hash("sha512", ($_POST["password"]) . $userObject->p1) == $userObject->p2) {
                    $tok = new Tok();
                    $tok->generateNewToken();
                    $tok->setTok();
                    $_SESSION['isAuth'] = true;
                    $_SESSION['username'] = $_POST['username'];
                    $this->userData->setLoginStatus($_SESSION['username'], true);
                    $this->userData->setLastActive($_SESSION['username']);
                    header('Location: /hexxagon/');
                }
                return "Invalid username or password.";
            }
            return "Invalid username or password.";
        }

        function logout()
        {
            unset($_SERVER['QUERY_STRING']);
            $this->userData->setLoginStatus($_SESSION['username'], false);
            $this->userData->setLastActive($_SESSION['username']);
            Lib::emptySession();
            session_destroy();
            setcookie("token", "");
            header('Location: /hexxagon/');
        }

        function validateToken($tokenString, $regen = false)
        {
            $tok = new Tok();
            if ($tok->isValidToken($tokenString)) {
                (new UserData())->setLastActive($_SESSION['username']);
                if ($regen) {
                    $tok->generateNewToken();
                    $tok->setTok();
                }
                return true;
            } else $this->logout();
        }
    }
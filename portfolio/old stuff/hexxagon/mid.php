<?php

    session_start();
    session_regenerate_id();
    Lib::sanitizePostArray();
    foreach (glob("_services/*.php") as $filename) if (file_exists($filename)) include_once $filename;
    function __autoload($c)
    {
        if (file_exists("utilities/$c.class.php")) require_once "utilities/$c.class.php";
    }

    class mid
    {
        private $auth, $messages;

        function __construct()
        {
            $this->messages = array();
            $this->auth = new Authorize();
            if (isset($_GET['logout'])) $this->auth->logout();
            else if (isset($_POST['login'])) $this->messages['login-message'] = $this->auth->login();
            else if (isset($_COOKIE["token"]) && !empty($_COOKIE["token"])) {
                $this->auth->validateToken($_COOKIE["token"], true);
            }
        }

        function getMidMessages()
        {
            return $this->messages;
        }

        function registerNewUser()
        {
            return (new RegisterService())->registerNewUser();
        }

        static function runUserMethodCall()
        {
            $publicMethods = array("getChat", "getBundle"); //whitelist public methods
            $auth = new Authorize();
            if (isset($_POST['method'])) {
                if (in_array($_POST['method'], $publicMethods)
                    ||
                    isset($_COOKIE['token']) && $auth->validateToken($_COOKIE['token'])
                ) {
                    require_once('_data/base.data.php');
                    require_once('_data/chat.data.php');
                    require_once('_data/user.data.php');
                    require_once('_data/game.data.php');
                    call_user_func(Lib::filterString($_POST['method']));
                }
            }
        }
    }

    mid::runUserMethodCall();
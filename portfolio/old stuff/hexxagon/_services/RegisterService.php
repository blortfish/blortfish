<?php

    class RegisterService
    {

        private $userData;

        function __construct()
        {
            $this->userData = new UserData();
        }

        function registerNewUser()
        {
            if (isset($_POST['registration-username']) && isset($_POST['registration-password']) && isset($_POST['registration-repeat-password']) && isset($_POST['registration-email'])) {
                $_POST['registration-username'] = strtolower($_POST['registration-username']);
                $_POST['registration-email'] = strtolower($_POST['registration-email']);
                if ($this->userData->doesUserExist($_POST["registration-username"])) return "<p class='registration-error'>Username already exists, please choose a different one.<p>";
                if (!Lib::isValidEmail($_POST["registration-email"])) return "<p class='registration-error'>Invalid email address.<p>";
                if (empty($_POST['registration-password']) || strlen($_POST['registration-password']) < 8) return "<p class='registration-error'>Invalid password, must be at least 8 characters.<p>";
                if ($_POST['registration-password'] != $_POST['registration-repeat-password']) return "<p class='registration-error'>Passwords do not match, please retry<p>";
                $registered = $this->userData->createUser($_POST["registration-username"], $_POST["registration-password"], $_POST["registration-email"]);
                if ($registered) return true;
            }
            return "<p>New user registration<p>";
        }
    }
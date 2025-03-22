<?php

    class BaseDataLayer
    {
        private $connection;

        function __construct()
        {
            include("/var/www/danielflint/db.cred.inc");
            $this->connection = new mysqli("localhost", $user, $password, $db);
        }

        function getConn()
        {
            return $this->connection;
        }
    }

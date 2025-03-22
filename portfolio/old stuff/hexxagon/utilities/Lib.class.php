<?php

    class Lib
    {
        static function createSalt()
        {
            return hash("sha512", uniqid(mt_rand()));
        }

        static function isValidEmail($email)
        {
            return filter_var($email, FILTER_VALIDATE_EMAIL)
            && preg_match('/@.+\./', $email);
        }

        static function sanitizePostArray()
        {
            foreach ($_POST as $key => $value) $_POST[$key] = Lib::filterString($value);
        }

        static function emptySession()
        {
            foreach ($_SESSION as $key) unset($_SESSION[$key]);
        }

        static function emptyPost()
        {
            foreach ($_POST as $key) unset($_POST[$key]);
        }

        static function createGUID()
        {
            return md5(uniqid(mt_rand()));
        }

        static function filterString($input)
        {
            return filter_var(strip_tags($input), FILTER_SANITIZE_STRING);
        }

        static function returnJson($stmt)
        {
            $stmt->execute();
            $stmt->store_result();
            $meta = $stmt->result_metadata();
            $bindVarsArray = array();
            while ($column = $meta->fetch_field()) {
                $bindVarsArray[] = & $results[$column->name];
            }
            call_user_func_array(array($stmt, 'bind_result'), $bindVarsArray);
            $data = array();
            while ($stmt->fetch()) {
                $clone = array();
                foreach ($results as $k => $v) {
                    $clone[$k] = $v;
                }
                $data[] = $clone;
            }
            if ($data == "[]") return false;
            return json_encode($data);
        }
    }
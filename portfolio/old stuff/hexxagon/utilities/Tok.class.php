<?php
    define("ENCRYPTION_KEY", "!@#$%^&*");

    class Tok
    {
        private $tok;
        private $uAgent, $timeStamp, $checkSum, $IP, $salt;
        private $lens;

        function __construct()
        {

        }

        function generateNewToken()
        {
            $this->lens = array();
            $this->uAgent = $this->getPaddedUserAgent();
            $_SESSION['USER_AGENT'] = $this->uAgent;
            $this->timeStamp = time();
            $_SESSION['USER_TIMESTAMP'] = $this->timeStamp;
            $this->IP = $_SERVER['REMOTE_ADDR'];
            $_SESSION['USER_IP'] = $this->IP;
            $this->salt = Lib::createSalt();
            $_SESSION['SALT'] = $this->salt;
            $this->cipherTok();
        }

        function getPaddedUserAgent()
        {
            return (strlen($_SERVER['HTTP_USER_AGENT']) % 2 > 0) ? $_SERVER['HTTP_USER_AGENT'] . " " : $_SERVER['HTTP_USER_AGENT'];
        }

        function cipherTok()
        {

            $this->IP = ip2long($this->IP);
            $this->uAgent = $this->encrypt($this->getPaddedUserAgent(), ENCRYPTION_KEY);

            $timeStamp = base_convert($this->timeStamp, 10, 16);
            $ip = base_convert($this->IP, 10, 20);

            $_SESSION['TIME_LEN'] = strlen($timeStamp);
            $_SESSION['IP_LEN'] = strlen($ip);
            $combine = substr($this->uAgent, floor(strlen($this->uAgent) / 2)) . $this->salt
                . $timeStamp . $ip
                . substr($this->uAgent, 0, floor(strlen($this->uAgent) / 2));

            $_SESSION['CHECKSUM'] = $this->checkSum = hash("sha1", $combine);
            $combine = substr_replace($combine, $this->checkSum, 26, 0);
            $this->tok = $combine;
        }

        function decipherTok($tok)
        {
            $token = $tok;

            $checkSum = substr($token, 26, 40);
            $token = str_replace($checkSum, "", $token);

            $size = floor(strlen($this->encrypt($this->getPaddedUserAgent(), ENCRYPTION_KEY)) / 2);
            $userAgent1 = substr($token, strlen($token) - $size);
            $token = str_replace($userAgent1, "", $token);

            $userAgent2 = substr($token, 0, $size);
            $token = str_replace($userAgent2, "", $token);
            $userAgent = $this->decrypt($userAgent1 . $userAgent2, ENCRYPTION_KEY);

            $tokenArr = array();
            $salt = substr($token, 0, 128);
            $token = str_replace($salt, "", $token);
            $timestamp = substr($token, 0, $_SESSION['TIME_LEN']);
            $token = str_replace($timestamp, "", $token);
            $timestamp = base_convert($timestamp, 16, 10);
            $ip = substr($token, 0, $_SESSION['IP_LEN']);
            $token = null;
            $ip = long2ip(base_convert($ip, 20, 10));

            $tokenArr['salt'] = $salt;
            $tokenArr['useragent'] = $userAgent;
            $tokenArr['timestamp'] = $timestamp;
            $tokenArr['ip'] = $ip;
            $tokenArr['checksum'] = $checkSum;
            return $tokenArr;
        }

        function setTok()
        {
            setcookie('token', $this->tok);
        }

        function encrypt($pure_string, $encryption_key)
        {
            $iv_size = mcrypt_get_iv_size(MCRYPT_BLOWFISH, MCRYPT_MODE_ECB);
            $iv = mcrypt_create_iv($iv_size, MCRYPT_RAND);
            $encrypted_string = mcrypt_encrypt(MCRYPT_BLOWFISH, $encryption_key, utf8_encode($pure_string), MCRYPT_MODE_ECB, $iv);
            return $encrypted_string;
        }

        function decrypt($encrypted_string, $encryption_key)
        {
            $iv_size = mcrypt_get_iv_size(MCRYPT_BLOWFISH, MCRYPT_MODE_ECB);
            $iv = mcrypt_create_iv($iv_size, MCRYPT_RAND);
            $decrypted_string = mcrypt_decrypt(MCRYPT_BLOWFISH, $encryption_key, $encrypted_string, MCRYPT_MODE_ECB, $iv);
            return $decrypted_string;
        }

        function isValidToken($t)
        {
            $decodedTokenData = $this->decipherTok($t);
            if (
                $_SESSION['CHECKSUM'] == $decodedTokenData['checksum'] &&
                $_SESSION['SALT'] == $decodedTokenData['salt'] &&
                $_SESSION['USER_TIMESTAMP'] == $decodedTokenData['timestamp'] &&
                $_SESSION['USER_IP'] == $decodedTokenData['ip']
            )
                return true;
            return false;
        }
    }
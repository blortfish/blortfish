<?php
    require_once('_data/base.data.php');

    class ChatData
    {
        private $base, $mysqli;

        function __construct()
        {
            $this->base = new BaseDataLayer();
            $this->mysqli = $this->base->getConn();
        }

        function getChat($chId, $msgId, $msgTime)
        {
            if (!$msgId) {
                $q = "SELECT username, timestamp,  MICROSECOND(timestamp) as micro, message, messageid FROM hex_chat WHERE gameid = ? AND timestamp BETWEEN (NOW() - INTERVAL 10 MINUTE ) AND NOW() ORDER BY timestamp ASC";
                if ($stmt = mysqli_prepare($this->mysqli, $q)) {
                    $stmt->bind_param('s', $chId);
                    return Lib::returnJson($stmt);
                }
            } else {
                $q = "SELECT username, timestamp,  MICROSECOND(timestamp) as micro, message, messageid FROM hex_chat WHERE timestamp > ? AND messageid != ? AND gameid = ? ORDER BY timestamp ASC";
                if ($stmt = mysqli_prepare($this->mysqli, $q)) {
                    $stmt->bind_param('sss', $msgTime, $msgId, $chId);
                    return Lib::returnJson($stmt);
                }
            }
            return false;
        }

        function sendMessageData($chId, $msg)
        {
            $messageid = Lib::createGUID();
            $username = $_SESSION['username'];
            $chatId = Lib::filterString($chId);
            $message = Lib::filterString($msg);
            if ($stmt = mysqli_prepare($this->mysqli, "INSERT INTO hex_chat
        (messageid, username, gameid, timestamp, message)
        VALUES (?, ?, ?,  sysdate(6), ?)")
            ) {
                $stmt->bind_param('ssss', $messageid, $username, $chatId, $message);
                $stmt->execute();
                $stmt = mysqli_prepare($this->mysqli, "SELECT timestamp, MICROSECOND(timestamp) as micro, username, message, messageid FROM hex_chat WHERE messageid = ?");
                $stmt->bind_param("s", $messageid);
                return Lib::returnJson($stmt);
            }
            return false;
        }
    }


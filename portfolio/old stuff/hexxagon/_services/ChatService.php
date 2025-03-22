<?php
    define("GENERAL_CHAT_ID", '00000000000000000000000000000000');
    function getChat()
    {
        $chatData = new ChatData();
        $chatId = (isset($_POST['chatId'])) ? $_POST['chatId'] : "";
        $lastMessageId = (isset($_POST['messageId'])) ? $_POST['messageId'] : "";
        $lastMessageTime = (isset($_POST['messageTime'])) ? $_POST['messageTime'] : "";

        if (!isset($chatId) || empty($chatId)) $chatId = GENERAL_CHAT_ID;
        if (!isset($_SESSION['isAuth']) || !$_SESSION['isAuth']) $chId = GENERAL_CHAT_ID; // allow access to general chat only
        if(!empty($chatId)) echo $chatData->getChat($chatId, $lastMessageId, $lastMessageTime);
    }

    function sendMessage()
    {
        $chatData = new ChatData();
        $chatId = (isset($_POST['chatid'])) ? $_POST['chatid'] : false;
        $message = (isset($_POST['message'])) ? $_POST['message'] : false;
        if ($message) echo $chatData->sendMessageData($chatId, $message);
    }

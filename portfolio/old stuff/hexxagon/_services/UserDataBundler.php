<?php
    function getBundle()
    {
        $auth = new Authorize();
        $userData = new UserData();
        $gameData= new GameData();
        $responseJSON = new stdClass();

        UserData::updateUserData(); //called to update all data and check heartbeats of online players

        //append data for authenticated user
        if (isset($_COOKIE['token'])) {
            $auth->validateToken($_COOKIE['token']); // heartbeat for logged in users
            $responseJSON->challenge = getChallenges($userData);
            $userGameId = $gameData->getGameId($_SESSION['username']);
            if(!empty($userGameId)){
                $responseJSON->game = new stdClass();
                $responseJSON->game->id = $userGameId;
                $allData = $gameData->getAllGameData($userGameId);
                $responseJSON->game->allData = $allData;
                if(isset($allData))
                {
                    $player1 = $allData->player1;
                    $responseJSON->game->allData->for = ($player1 == $_SESSION['username']) ? "1" : "2" ;
                    $responseJSON->game->allData->board = json_decode($responseJSON->game->allData->board);
                }

            }
        }

        //append all other data
        $responseJSON->online = getOnlinePlayerData($userData);
        echo json_encode($responseJSON);
    }

    function getOnlinePlayerData($userData)
    {
        return $userData->getOnlinePlayersWithRecord();
    }

    function appendGameData($gameId, $clientObject){

    }

    function getChallenges($userData)
    {
        $challenger = $userData->getChallenge($_SESSION['username']);
        if (!empty($challenger)) return $challenger;
        return '';
    }
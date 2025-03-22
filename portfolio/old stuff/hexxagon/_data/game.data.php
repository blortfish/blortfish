<?php

    define("EMPTY_BOARD",
        "[
        [1, 0, 0, 0, 2],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [2, 0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 2]
        ]");

    class GameData
    {
        private $base, $mysqli;

        function __construct()
        {
            $this->base = new BaseDataLayer();
            $this->mysqli = $this->base->getConn();
        }

        function createNewGame($player1, $player2)
        {
            $q = "INSERT INTO hex_game VALUES(?, ?, ?, ?, NOW(), null, ?)";
            if ($stmt = mysqli_prepare($this->mysqli, $q)) {
                $gameId = Lib::createGUID();
                $gameStarter = rand(1, 2);
                $board = EMPTY_BOARD;
                $stmt->bind_param("ssssi", $gameId, $player1, $player2, $board, $gameStarter);
                $stmt->execute();
                return $gameId;
            }
            return false;
        }

        function setTurn($gameId, $setValue)
        {
            $q = "UPDATE hex_game SET turn = ? WHERE game_id = ?";
            if ($stmt = mysqli_prepare($this->mysqli, $q)) {
                $stmt->bind_param("is", $setValue, $gameId);
                $stmt->execute();
            }
            return false;
        }

        function setUsersGameId($gameId, $player1, $player2)
        {
            $q = "UPDATE hex_users SET current_game = ? WHERE username = ? OR username = ?";
            if ($stmt = mysqli_prepare($this->mysqli, $q)) {
                $stmt->bind_param("sss", $gameId, $player1, $player2);
                $stmt->execute();
            }
            return false;
        }

        function getGameId($username){
            $q = "SELECT current_game FROM hex_users WHERE username = ?";
            if ($stmt = mysqli_prepare($this->mysqli, $q)) {
                $stmt->bind_param("s", $username);
                $gameId = json_decode(Lib::returnJson($stmt));
                if(!empty($gameId))
                    return $gameId[0]->current_game;
            }
            return false;
        }

        function updateBoard( $gameId, $updatedBoard ){
            $q = "UPDATE hex_game SET board = ? WHERE game_id = ?";
            if ($stmt = mysqli_prepare($this->mysqli, $q)) {
                $stmt->bind_param("ss", $updatedBoard, $gameId);
                $stmt->execute();
            }
            return false;
        }

        function closeGame( $gameId ){
            $q = "UPDATE hex_game SET endtime = NOW() WHERE game_id = ?";
            if ($stmt = mysqli_prepare($this->mysqli, $q)) {
                $stmt->bind_param("s", $gameId);
                $stmt->execute();
            }
            return false;
        }

        function freeUser($username){
            $q = "UPDATE hex_users SET current_game = '0' WHERE username = ?";
            if ($stmt = mysqli_prepare($this->mysqli, $q)) {
                $stmt->bind_param("s", $username);
                $stmt->execute();
            }
            return true;
        }

        function getAllGameData($gameId){
            $q = "SELECT * FROM hex_game WHERE game_id = ?";
            if ($stmt = mysqli_prepare($this->mysqli, $q)) {
                $stmt->bind_param("s", $gameId);
                $data = json_decode(Lib::returnJson($stmt));
                if(isset($data[0]))
                    return $data[0];
            }
            return false;
        }
    }
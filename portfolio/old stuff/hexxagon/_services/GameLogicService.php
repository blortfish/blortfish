<?php

    function sendMove(){
        $gameData = new GameData();
        if(isset($_POST['moveFrom']) && isset($_POST['moveTo'])){
            $valid = updateBoard($gameData,  $_POST['moveFrom'], $_POST['moveTo']);
            echo json_encode($valid);
        }
    }

    function updateBoard($gameData, $moveFrom, $moveTo){
        $validMoves = getValidMoves($gameData, $moveFrom);

        $userGameId = $gameData->getGameId($_SESSION['username']);
        $allGameData = $gameData->getAllGameData($userGameId);
        $playerNumber = ($_SESSION['username'] == $allGameData->player1) ? 1 : 2;
        $board = json_decode($allGameData->board);

        $colMoveFrom = explode('_', $moveFrom)[0];
        $rowMoveFrom = explode('_', $moveFrom)[1];
        $colMoveTo = explode('_', $moveTo)[0];
        $rowMoveTo = explode('_', $moveTo)[1];
        $setTurn = ($playerNumber == 1) ? 2 : 1;
        if($board[$colMoveTo][$rowMoveTo] == 0) //must be empty
        {
            if(in_array($moveTo, $validMoves['dupes'])){
                $board[$colMoveTo][$rowMoveTo] = $playerNumber;
                $board = captureEdges($gameData, $moveTo, $board, $playerNumber);
            }
            else if(in_array($moveTo, $validMoves['jumps'])){
                $board[$colMoveTo][$rowMoveTo] = $playerNumber;
                $board[$colMoveFrom][$rowMoveFrom] = 0;
            }
            $board = captureEdges($gameData, $moveTo, $board, $playerNumber);
            $gameData->updateBoard($userGameId, json_encode($board));

            return checkGameStatus($gameData, $board, $userGameId, $setTurn, $allGameData);
        }
        return false;
    }

    function captureEdges($gameData, $moveTo, $board, $playerNumber){
        $captureEdges = getValidMoves($gameData, $moveTo)['dupes']; // use same method to grab edges
        foreach($captureEdges as $edge){
            $colEdgeCap = explode('_', $edge)[0];
            $rowEdgeCap = explode('_', $edge)[1];
            if($board[$colEdgeCap][$rowEdgeCap] != 0) $board[$colEdgeCap][$rowEdgeCap]  = $playerNumber;
        }
        return $board;
    }

    function freeUser(){
        $username = (isset($_SESSION['username'])) ? $_SESSION['username'] : "";
        (new GameData())->freeUser($username);
    }

    function checkGameStatus($gameData, $board, $userGameId, $setTurn){
        $player1Score = 0;
        $player2Score = 0;

        for($i = 0; $i < sizeof($board) ; $i++){
            $currentRow = $board[$i];
            for($j = 0; $j < sizeof($currentRow); $j++){
                if($currentRow[$j] == 1) $player1Score++;
                else if($currentRow[$j] == 2) $player2Score++;
            }
        }
        if($player1Score + $player2Score == 58 || $player1Score == 0 || $player2Score == 0){
            $setTurn = 0;
            $gameData->closeGame($userGameId);
        }
        $gameData->setTurn($userGameId, $setTurn);
        return true;
    }

    function getValidMoves($gameData, $moveFrom){
        if(isset($_SESSION['username'])){
            $userGameId = $gameData->getGameId($_SESSION['username']);

            $possibleJumps = array();
            $possibleDupes = array();
            $col = explode('_', $moveFrom)[0];
            $row = explode('_', $moveFrom)[1];

            $colLens = [5, 6, 7, 8, 9, 8, 7, 6, 5];
            $thisColLen = $colLens[$col];

            //gimmies
            array_push($possibleJumps, $col . '_' .  ($row - 2));
            array_push($possibleJumps, $col . '_' .  ($row + 2) );
            array_push($possibleDupes, $col . '_' .  ($row - 1) );
            array_push($possibleDupes, $col . '_' .  ($row + 1) );
            array_push($possibleDupes, $col . '_' . ($row - 1) );
            array_push($possibleDupes, $col . '_' . ($row + 1));
            //here we go

            //two cols left



            if (isset($colLens[$col - 2]) && $thisColLen > $colLens[$col - 2]) {
                array_push($possibleJumps, ($col - 2) . '_' . ($row));
                array_push($possibleJumps, ($col - 2) . '_' . ($row - 1));
                array_push($possibleJumps, ($col - 2) . '_' . ($row - 2));
            }
            else if (isset($colLens[$col - 2]) && $thisColLen > $colLens[$col - 2]) {
                array_push($possibleJumps, ($col - 2) . '_' . ($row));
                array_push($possibleJumps, ($col - 2) . '_' . ($row - 1));
                array_push($possibleJumps, ($col - 2) . '_' . ($row + 1));
            }
            else {
                array_push($possibleJumps, ($col - 2) . '_' . ($row));
                array_push($possibleJumps, ($col - 2) . '_' . ($row + 1));
                array_push($possibleJumps, ($col - 2) . '_' . ($row + 2));
            }

            //end two $columns away
            //two cols right
            if (isset($colLens[$col + 2]) && $thisColLen > $colLens[$col + 2]) {
                array_push($possibleJumps, ($col + 2) . '_' . ($row));
                array_push($possibleJumps, ($col + 2) . '_' . ($row - 1));
                array_push($possibleJumps, ($col + 2) . '_' . ($row - 2));
            }
            else if(isset($colLens[$col + 2]) && $thisColLen == $colLens[$col + 2]){
                array_push($possibleJumps, ($col + 2) . '_' . ($row));
                array_push($possibleJumps, ($col + 2) . '_' . ($row - 1));
                array_push($possibleJumps, ($col + 2) . '_' . ($row + 1));
            }
            else {
                array_push($possibleJumps, ($col + 2) . '_' . ($row));
                array_push($possibleJumps, ($col + 2) . '_' . ($row + 1));
                array_push($possibleJumps, ($col + 2) . '_' . ($row + 2));
            }


            //one $column away
            //handles duplicate and jump

            if (isset($colLens[$col - 1]) && $thisColLen > $colLens[$col - 1]) {
                array_push($possibleJumps, ($col - 1) . '_' . ($row - 2));
                array_push($possibleJumps, ($col - 1) . '_' . ($row + 1));

                array_push($possibleDupes, ($col - 1) . '_' . $row);
                array_push($possibleDupes, ($col - 1) . '_' . ($row - 1));
            }
            else {
                array_push($possibleJumps, ($col - 1) . '_' . ($row - 1));
                array_push($possibleJumps, ($col - 1) . '_' . ($row + 2));

                array_push($possibleDupes, ($col - 1) . '_' . $row);
                array_push($possibleDupes, ($col - 1) . '_' . ($row + 1));
            }

            if (isset($colLens[$col +1]) && $thisColLen > $colLens[$col + 1])
            {
                array_push($possibleJumps, $col + 1 . '_' . ($row + 1));
                array_push($possibleJumps, $col + 1 . '_' . ($row - 2));
                array_push($possibleDupes, $col + 1 . '_' . $row);
                array_push($possibleDupes, $col + 1 . '_' . ($row - 1));
            }
            else {
                array_push($possibleJumps, $col + 1 . '_' . ($row - 1));
                array_push($possibleJumps, $col + 1 . '_' . ($row + 2));

                array_push($possibleDupes, $col + 1 . '_' . ($row));
                array_push($possibleDupes, $col + 1 . '_' . ($row + 1));
            }
             //end one $column away


            $possibleDupes = array_values(array_unique($possibleDupes));
            $possibleJumps = array_values(array_unique($possibleJumps));


            foreach($possibleDupes as $dupe){
                $col = explode('_', $dupe)[0];
                $row = explode('_', $dupe)[1];
                $dupleColLen = (isset($colLens[$col])) ? $colLens[$col] : -1;
                if($col < 0|| $row < 0
                    || $row >= $dupleColLen) unset($possibleDupes[array_search($dupe, $possibleDupes)]);
            }
            foreach($possibleJumps as $jump){
                $col = explode('_', $jump)[0];
                $row = explode('_', $jump)[1];
                $jmpColLen = (isset($colLens[$col])) ? $colLens[$col] : -1;
                if($col < 0|| $row < 0
                    || $row >= $jmpColLen) unset($possibleJumps[array_search($jump, $possibleJumps)]);
            }
            $possibleDupes = array_values(array_unique($possibleDupes));
            $possibleJumps = array_values(array_unique($possibleJumps));

            $moves['dupes'] = $possibleDupes;
            $moves['jumps'] = $possibleJumps;
            return $moves;
        }
        return false;
    }
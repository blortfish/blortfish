<?php

    function sendChallenge()
    {
        if (isset($_POST['challengeUser'])) {
            if ($_SESSION['username'] != $_POST['challengeUser']) {
                $userData = new UserData();
                if ($userData->playerIsAvailable($_POST['challengeUser'])) {
                    if ($userData->setChallenger($_SESSION['username'], $_POST['challengeUser']))
                        echo json_encode("true");
                } else echo json_encode("false");
            }
        }
    }

    function respondToChallenge()
    {
        if (isset($_POST['challengeResponse'])) {
            $userData = new UserData();
            if (json_decode($_POST['challengeResponse']) === true) {
                $gameData = new GameData();
                if ($gameId = $gameData->createNewGame($userData->getChallenge($_SESSION['username']), $_SESSION['username'])) {
                    $gameData->setUsersGameId($gameId, $userData->getChallenge($_SESSION['username']), $_SESSION['username']);
                }
                $userData->unsetChallenger($_SESSION['username']);
            } else {
                $userData->unsetChallenger($_SESSION['username']);
            }
        }
    }
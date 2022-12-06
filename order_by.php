<?php
require_once "config_gameinfo.php";

/*

USE A POST TO CHECK FOR DECENDING AND ASCENDING
ORDER OF THE INFORMATION
A.K.A delete all the functions lol...

*/

$conn = new mysqli($servername, $username, $password, $dbname_game);

function order_total_games(){
    $sql = "SELECT * FROM leaderboard ORDER BY `total_games` DESC";
    $result = $conn->query($sql);
    echo $result;
    json_encode($result);
    echo $result;
}

function order_wins(){
    $sql = "SELECT * FROM leaderboard ORDER BY `wins` DESC";
    $result = $conn->query($sql);
    json_encode($result);
    echo $result;
}

function order_time_played(){
    $sql = "SELECT * FROM leaderboard ORDER BY `time_played` DESC";
    $result = $conn->query($sql);
    json_encode($result);
    echo $result;
}

function order_turn_count(){
    $sql = "SELECT * FROM leaderboard ORDER BY `turn_count` DESC";
    $result = $conn->query($sql);
    json_encode($result);
    echo $result;
}

order_total_games();
order_wins();
order_time_played();
order_turn_count();
?>
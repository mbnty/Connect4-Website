<?php
include "playerClass.php";

$conn = new mysqli("localhost", "root", "", "connect4");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "CREATE TABLE IF NOT EXISTS leaderboard(
    pkey INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `login` VARCHAR(30) NOT NULL,
    `total_games` INT(10) NOT NULL,
    `wins` INT(5) NOT NULL,
    `time_played` INT(10) NOT NULL,
    `turn_count` INT(10) NOT NULL
)";
$conn->query($sql);

$sql = "SELECT * FROM leaderboard";
$result = $conn->query($sql);
$i = 0;
$arr = Array();

if($result->num_rows > 0){
    while($row = $result->fetch_assoc()){
        $newPlayer = new Player();
        $newPlayer->Name = ($row["login"]);
        $newPlayer->TotalGames = ($row["total_games"]);
        $newPlayer->Wins = ($row["wins"]);
        $newPlayer->TimePlayed = ($row["time_played"]);
        $newPlayer->TurnCount = ($row["turn_count"]);

        $arr[$i] = $newPlayer;
        $i++;
    }
    echo json_encode($arr);
}
else{
    $newPlayer = new Player();
    $newPlayer->Name = "EMPTY";
    $newPlayer->TotalGames = 0;
    $newPlayer->Wins = 0;
    $newPlayer->TimePlayed = 0;
    $newPlayer->TurnCount = 0;
    $arr[0] = $newPlayer;
    echo json_encode($arr);
}
?>
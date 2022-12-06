<?php
include "playerClass.php";

$conn = new mysqli("localhost", "root", "", "connect4");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

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
        $newPlayer->TimePLayed = ($row["time_played"]);
        $newPlayer->TurnCount = ($row["turn_count"]);

        $arr[$i] = $newPlayer;
        $i++;
    }
    echo json_encode($arr);
}
else{
    $bad1=[ 'bad' => 1];
    echo json_encode($bad1);
}
?>
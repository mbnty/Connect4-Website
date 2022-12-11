<?php
include "playerClass.php";

$conn = new mysqli("localhost", "root", "", "connect4");
$i = 0;
$arr = Array();

if($_SERVER["REQUEST_METHOD"] == 'POST'){
    if(isset($_POST['col'])){
        if(isset($_POST["dir"])){
            
            $sql = $_POST['dir'] != "" ? "SELECT * FROM leaderboard ORDER BY " . $_POST['col'] . " " . $_POST['dir'] : "SELECT * FROM leaderboard";
            
            $result = $conn->query($sql);
            if($result->num_rows > 0){
                while($row = $result->fetch_assoc()){
                    $newPlayer = new Player();
                    $newPlayer->Name = ($row['login']);
                    $newPlayer->TotalGames = ($row['total_games']);
                    $newPlayer->Wins = ($row['wins']);
                    $newPlayer->TimePlayed = ($row['time_played']);
                    $newPlayer->TurnCount = ($row['turn_count']);

                    $arr[$i] = $newPlayer;
                    $i ++;
                }
                echo json_encode($arr);
            }
        }
    }
}
$conn->close();

?>
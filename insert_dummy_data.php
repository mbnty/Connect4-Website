<?php
require_once "config_gameinfo.php";

$conn = new mysqli($servername, $username, $password, $dbname_game);

$sql = "CREATE TABLE IF NOT EXISTS leaderboard(
    pkey INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `login` VARCHAR(30) NOT NULL,
    `total_games` INT(10) NOT NULL,
    `wins` INT(5) NOT NULL,
    `time_played` INT(10) NOT NULL,
    `turn_count` INT(10) NOT NULL
)";

$sql = 'SELECT * FROM leaderboard WHERE  `login`="dummy1"';
$result = $conn->query($sql);

if($result->num_rows == 0){
    //if table is empty, populate with dummy data
    $dum1 = 'INSERT INTO `leaderboard`(`login`, `total_games`, `wins`, `time_played`, `turn_count`) VALUES 
    ("dummy1", 869, 5, 20000, 10000)'; //max total games
    $conn->query($dum1);

    $dum2 = 'INSERT INTO `leaderboard`(`login`, `total_games`, `wins`, `time_played`, `turn_count`) VALUES 
    ("dummy2", 758, 645, 20426, 12736)'; //max wins
    $conn->query($dum2);

    $dum3 = 'INSERT INTO `leaderboard`(`login`, `total_games`, `wins`, `time_played`, `turn_count`) VALUES 
    ("dummy3", 25, 10, 69000, 500)'; //max time played
    $conn->query($dum3);

    $dum4 = 'INSERT INTO `leaderboard`(`login`, `total_games`, `wins`, `time_played`, `turn_count`) VALUES 
    ("dummy4", 416, 0, 34584, 17473)'; //max turn count
    $conn->query($dum4);
}
else{
    echo "Error dummy data already exists in database: " . $conn->error ."<br>";
}
?>
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
    ("dummy1", 5, 4, 50000, 25)';
    $conn->query($dum1);

    $dum2 = 'INSERT INTO `leaderboard`(`login`, `total_games`, `wins`, `time_played`, `turn_count`) VALUES 
    ("dummy2", 6, 7, 50001, 26)';
    $conn->query($dum2);

    $dum3 = 'INSERT INTO `leaderboard`(`login`, `total_games`, `wins`, `time_played`, `turn_count`) VALUES 
    ("dummy3", 15, 14, 50100, 128)';
    $conn->query($dum3);

    $dum4 = 'INSERT INTO `leaderboard`(`login`, `total_games`, `wins`, `time_played`, `turn_count`) VALUES 
    ("dummy4", 25, 24, 56789, 259)';
    $conn->query($dum4);
}
else{
    echo "Error creating table: " . $conn->error ."<br>";
}
?>
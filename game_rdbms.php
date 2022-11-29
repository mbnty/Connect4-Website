<?php
require_once "config_gameinfo.php";
require_once "login_mysql.php";

$sql = "CREATE DATABASE IF NOT EXISTS ". $dbname;
if ($conn->query($sql) === TRUE) {
    echo "Database ". $dbname ." created successfully<br>";
} else {
    echo "Error creating database: " . $conn->error ."<br>";
}

$conn = new mysqli($servername, $username, $password, $dbname);

$sql = "CREATE TABLE IF NOT EXISTS leaderboard(
    pkey INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    login VARCHAR(30) NOT NULL,
    total_games INT(10) NOT NULL,
    wins INT(5) NOT NULL,
    time_played TIME(3) NOT NULL,
    turn_count INT(10) NOT NULL
)";

if($conn->query($sql)===TRUE){
    echo "Table leaderboard created successfully <br>";
}
else{
    echo "Error creating table: " . $conn->error ."<br>";
}

if (isset($_SESSION["username"])){
    echo "Login is: ". $_SESSION["username"] . "<br>";
}
else{
    echo "Login not defined. <br>";
}

?>
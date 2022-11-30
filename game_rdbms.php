<?php
require_once "config_gameinfo.php";

session_start();

$sql = "CREATE DATABASE IF NOT EXISTS ". $dbname_game;
if ($conn->query($sql) === TRUE) {
    echo "Database ". $dbname_game ." created successfully<br>";
} else {
    echo "Error creating database: " . $conn->error ."<br>";
}

$conn = new mysqli($servername, $username, $password, $dbname_game);

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

if (isset($_SESSION['username'])){
    echo "Login is: ". $_SESSION['username'] . "<br>";
}
else{
    echo "Login not defined. <br>";
}

//execute only on a POST
if($_SERVER['REQUEST_METHOD'] == 'POST'){

    //input the user information into the leaderboard
    $sql = "INSERT INTO leaderboard (login, total_games, wins, time_played, turn_count) VALUES (?,?,?,?,?)";

    $logged_player = $_SESSION['username'];

    if($stmt = mysqli_prepare($conn, $sql)){
        // Bind variables to the prepared statement as parameters
        //mysqli_stmt_bind_param($stmt, "siisi", $logged_player, $total_games, $wins, $time_played, $turn_count);

        // Attempt to execute the prepared statement
        if(mysqli_stmt_execute($stmt)){
            // Redirect to home page
            //header("location: index2.html");
        } else{
            echo "Something went wrong. Please try again later.";
        }
    }
    // Close statement
    mysqli_stmt_close($stmt);
}

mysqli_close($conn);

//after updating leaderboard, go back to home page
header("location: index2.html");

?>
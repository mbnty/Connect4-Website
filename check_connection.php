<?php
require_once "config_user.php";
require_once "config_gameinfo.php";

session_start();

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
$conn_game = new mysqli($servername, $username, $password, $dbname_game);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error ."<br>");
} 
//echo "Connected successfully to connect4.<br>";

if ($conn_game->connect_error) {
    die("Connection failed: " . $conn_game->connect_error ."<br>");
} 
//echo "Connected successfully to leaderboard.<br>";

if (isset($_SESSION['username'])){
    //echo "Login is: ". $_SESSION['username'] . "<br>";
    echo "";
}
else{
    echo "Login not defined.";
    http_response_code(401);
    header("location: login.html");
}

echo $_SESSION['username'];

?>
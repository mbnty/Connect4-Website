<?php
$servername = "localhost"; // default server name
$username = "root"; // user name that you created
$password = ""; // password that you created
$dbname_game = "connect4";

$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error ."<br>");
} 
//echo "Connected successfully <br>";

//Creation of the database
$sql = "CREATE DATABASE IF NOT EXISTS ". $dbname_game;
if ($conn->query($sql) === TRUE) {
    //echo "Database ". $dbname_game ." created successfully.<br>";
} else {
    echo "Error creating database: " . $conn->error ."<br>";
}
?>
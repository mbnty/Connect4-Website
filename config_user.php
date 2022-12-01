<?php
/* Database credentials. Assuming you are running MySQL
server with default setting (user 'root' with no password) */
 
$servername = "localhost"; // default server name
$username = "root"; // user name that you created
$password = ""; // password that you created
$dbname = "connect4";

// Create connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error ."<br>");
} 
//echo "Connected successfully <br>";

//Creation of the database
$sql = "CREATE DATABASE IF NOT EXISTS ". $dbname;
if ($conn->query($sql) === TRUE) {
    //echo "Database ". $dbname ." created successfully<br>";
    echo "";
} else {
    echo "Error creating database: " . $conn->error ."<br>";
}
?>
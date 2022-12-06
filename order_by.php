<?php
require_once "config_gameinfo.php";

$conn = new mysqli($servername, $username, $password, $dbname_game);

if($_SERVER["REQUEST_METHOD"] == 'POST'){
    if(isset($_POST["order_by"])){
        $sql = "SELECT * FROM leaderboard ORDER BY " . $_POST["order_by"];
    }
    else if(isset($_POST["order"])){
        $sql = "SELECT * FROM leaderboard ORDER BY " . $_POST["order"];
    }
    else{
        echo "NO POST FOUND";
    }
    
    $result = $conn->query($sql);
    json_encode($result);
    echo $result;
}

?>
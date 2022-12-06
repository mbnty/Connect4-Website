<?php
require_once "config_gameinfo.php";

$conn = new mysqli($servername, $username, $password, $dbname_game);

if($_SERVER["REQUEST_METHOD"] == 'POST'){
    //if(isset($_POST['attribute'])){
        //echo "attribute is set";
        //if(isset($_POST["direction"])){
            //echo "both POSTS are good";
            $att = $_POST['attribute'];
            echo json_encode($_POST);
            echo "Attribute is: ".$att;
            
            //$sql = "SELECT * FROM leaderboard ORDER BY " . $_POST['attribute'] . " " . $_POST['direction'];
            
            $result = $conn->query($sql);
            json_encode($result);
            echo $result;
        //}
        //else{
            //echo "inner loop bad";
        //}
    //}
    //else{
        //echo "outer loop bad";
    //}

}

?>
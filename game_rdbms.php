<?php
require_once "config_gameinfo.php";

session_start();

$current_user = $_SESSION['username'];
echo $current_user."<br>";

$conn = new mysqli($servername, $username, $password, $dbname_game);

$sql = "CREATE TABLE IF NOT EXISTS leaderboard(
    pkey INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `login` VARCHAR(30) NOT NULL,
    `total_games` INT(10) NOT NULL,
    `wins` INT(5) NOT NULL,
    `time_played` TIME(3) NOT NULL,
    `turn_count` INT(10) NOT NULL
)";

if($conn->query($sql)===TRUE){ //check if the query is good
    //echo "Table created successfully";
}
else{
    echo "Error creating table: " . $conn->error ."<br>";
}

if (isset($current_user)){
    //echo "Login is: ". $current_user . "<br>";
}
else{
    echo "Login not defined. <br>";
}

if($_SERVER['REQUEST_METHOD'] = 'POST'){

    //query to check if user exists in the leaderboard
    $sql = 'SELECT `login`,`total_games`, `wins`, `time_played`, `turn_count` FROM leaderboard WHERE `login`=?;';
    echo $sql."<br>";
    if($stmt = mysqli_prepare($conn, $sql)){

        //bind the current user to the SELECT sql
        mysqli_stmt_bind_param($stmt, "s", $current_user);
        // Attempt to execute the prepared statement
        $check_execute = mysqli_stmt_execute($stmt);
        echo "myqli_stmt_execute value is: ".$check_execute;
        if($check_execute == true){

            mysqli_stmt_bind_result($stmt, $temp_user, $total_games, $wins, $time_played, $turn_count);
            if(mysqli_stmt_fetch($stmt)){
                
                //get posted values 
                $new_tot_games = $_POST['totGames'];
                $new_wins = $_POST['victories'];
                (int)$new_time_played = $_POST['playTime'];
                $new_turn_count = $_POST['turns'];
            
                //updated info = posted info + curr info
                $insert_new_total = $new_tot_games + $total_games;
                $insert_new_wins = $new_wins + $wins;
                (int)$insert_new_time = (int)$new_time_played + (int)$time_played;
                $insert_new_turn = $new_turn_count + $new_turn_count;
            
                mysqli_stmt_free_result($stmt);
                //update the database
                $sql = "UPDATE leaderboard SET `total_games`=?, `wins`=?, `time_played`=?, `turn_count`=? WHERE `login`=?";
                if($stmt = mysqli_prepare($conn, $sql)){
                    mysqli_stmt_bind_param($stmt, "iiiis", $insert_new_total, $insert_new_wins, $insert_new_time, $insert_new_turn, $current_user);

                    if(mysqli_stmt_execute($stmt)){
                        echo "Updating leaderboard is good";
                    }
                    else{
                        echo "Updating leaderboard broke.";
                    }
                }
            }

            else{
                echo "Username not found in leaderboard... adding them to leaderboard.";
                $sql = "INSERT INTO leaderboard (`login`, `total_games`, `wins`, `time_played`, `turn_count`) VALUES (?,?,?,?,?)";
                
                //get info from POST
                $new_tot_games = $_POST['totGames'];
                $new_wins = $_POST['victories'];
                $new_time_played = $_POST['playTime'];
                $new_turn_count = $_POST['turns'];

                if($stmt = mysqli_prepare($conn, $sql)){
                    // Bind variables to the prepared statement as parameters
                    mysqli_stmt_bind_param($stmt, "siiii", $current_user, $new_tot_games, $new_wins, $new_time_played, $new_turn_count);
            
                    // Attempt to execute the prepared statement
                    if(mysqli_stmt_execute($stmt)){
                        echo "Inserting new user into leaderboard is good";
                    }
                    else{
                        echo "Inserting new user into leaderboard broke";
                    }
                }
            }
            mysqli_stmt_free_result($stmt);
            mysqli_stmt_close($stmt);
        }
    }
}

$conn->close();

?>
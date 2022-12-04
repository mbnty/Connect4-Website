<?php
require_once "config_gameinfo.php";

session_start();

$current_user = $_SESSION['username'];

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
    $sql = 'SELECT `login` from leaderboard WHERE `login`="?"';
    if($stmt = mysqli_prepare($conn, $sql)){
        // Bind variables to the prepared statement as parameters
        mysqli_stmt_bind_param($stmt, "s", $current_user);
        // Attempt to execute the prepared statement
        if(mysqli_stmt_execute($stmt)){
            // Store result
            mysqli_stmt_store_result($stmt);  
            $var = mysqli_stmt_num_rows($stmt);
            echo "VAR number is: ".$var;
            // Check if username exists
            if($var == 1){
                $sql = "SELECT * from leaderboard WHERE `login` =".$current_user;
                $result = $conn->query($sql);
                $row = $result->fetch_assoc();
        
                //get current info from leaderboard
                $total_games = $row["total_games"];
                $wins = $row["wins"];
                $time_played = $row["time_played"];
                $turn_count = $row["turn_count"];
        
                //get posted values 
                $new_tot_games = $_POST['totGames'];
                $new_wins = $_POST['victories'];
                $new_time_played = $_POST['playTime'];
                $new_turn_count = $_POST['turns'];
        
                //updated info = posted info + curr info
                $insert_new_total = $new_tot_games + $total_games;
                $insert_new_wins = $new_wins + $wins;
                $insert_new_time = $new_time_played + $time_played;
                $insert_new_turn = $new_turn_count + $new_turn_count;
        
                //update the database
                $sql = "UPDATE leaderboard SET `total_games`, `wins`, `time_played`, `turn_count`) VALUES (?,?,?,?)";
                if($stmt = mysqli_prepare($conn, $sql)){
                    mysqli_stmt_bind_param($stmt, "iisi", $insert_new_total, $insert_new_wins, $insert_new_time, $insert_new_turn);
                    
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
                    mysqli_stmt_bind_param($stmt, "siisi", $current_user, $new_tot_games, $new_wins, $new_time_played, $new_turn_count);
            
                    // Attempt to execute the prepared statement
                    if(mysqli_stmt_execute($stmt)){
                        echo "Inserting new user into leaderboard is good";
                    }
                    else{
                        echo "Inserting new user into leaderboard broke";
                    }
                }
                // Close statement
                mysqli_stmt_close($stmt);
            }
        }
    }
}

$conn->close();

mysqli_close($conn);

//after updating leaderboard, go back to home page
//header("location: index2.html");

?>
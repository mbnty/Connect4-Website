<?php
// Include config file
require_once 'config_user.php';

//connect to the server
$conn = new mysqli($servername, $username, $password, $dbname);
 
// Define variables and initialize with empty values
$username = $password = "";
$username_err = $password_err = "";
 
// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){

    // Prepare a select statement
    $sql = "SELECT login, date_created, password FROM admin WHERE login = ?";
    if($stmt = mysqli_prepare($conn, $sql)){
        // Bind variables to the prepared statement as parameters
        mysqli_stmt_bind_param($stmt, "s", $param_username);
        // Set parameters
        $param_username = $_POST['username'];
        // echo $param_username;
        // Attempt to execute the prepared statement
        if(mysqli_stmt_execute($stmt)){
            // Store result
            mysqli_stmt_store_result($stmt);  
            $var = mysqli_stmt_num_rows($stmt);
            // Check if username exists, if yes then verify password
            if($var == 1){                    
                // Bind result variables
                mysqli_stmt_bind_result($stmt, $_POST['username'], $param_date, $hashed_password);
                if(mysqli_stmt_fetch($stmt)){
                    //echo $password ."<br>";
                    //echo $hashed_password ."<br>";
                    if(password_verify($_POST['password'], $hashed_password)){
                        /* Password is correct, so start a new session and
                        save the username to the session */
                        session_start();
                        $_SESSION['username'] = $_POST['username'];
                        //echo "Session created: " . $_SESSION['username'] . "<br>";

                        echo $_SESSION['username'];

                        //header("location: check_login.php");
                        //header("location: game_rdbms.php");
                    } else{
                        // Display an error message if password is not valid
                        $password_err = 'The password you entered was not valid.';
                        http_response_code(401);
                    }
                }
            } else{
                // Display an error message if username doesn't exist
                $username_err = 'No account found with that username.';
                http_response_code(401);
            }
        } else{
            http_response_code(401);
            echo "Oops! Something went wrong. Please try again later.";
        }
    }
    // Close statement
    mysqli_stmt_close($stmt);
    // Close connection
    mysqli_close($conn);
}
?>
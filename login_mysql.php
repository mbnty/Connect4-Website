<?php
// Include config file
require_once 'config_user.php';

//connect to the server
$conn = new mysqli($servername, $username, $password, $dbname);
 
// Define variables and initialize with empty values
$username = $password = "";
$username_err = $password_err = "";
 
//echo "Checking for POST." . "<br>";
// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){
    echo "POST went through" . "<br>";
    echo $_POST['username'];

    // Prepare a select statement
    $sql = "SELECT login, date_created, password FROM admin WHERE login = ?";
    if($stmt = mysqli_prepare($conn, $sql)){
        echo " 20 || ";
        // Bind variables to the prepared statement as parameters
        mysqli_stmt_bind_param($stmt, "s", $param_username);
        // Set parameters
        $param_username = $_POST['username'];
        // echo $param_username;
        // Attempt to execute the prepared statement
        if(mysqli_stmt_execute($stmt)){
            echo "28 || ";
            // Store result
            mysqli_stmt_store_result($stmt);  
            $var = mysqli_stmt_num_rows($stmt);
            // Check if username exists, if yes then verify password
            if($var == 1){    
                echo "34 || ";                
                // Bind result variables
                mysqli_stmt_bind_result($stmt, $_POST['username'], $param_date, $hashed_password);
                if(mysqli_stmt_fetch($stmt)){
                    echo "38 || ";
                    //echo $password ."<br>";
                    //echo $hashed_password ."<br>";
                    if(password_verify($_POST['password'], $hashed_password)){
                        echo "42 || ";
                        /* Password is correct, so start a new session and
                        save the username to the session */
                        session_start();
                        $_SESSION['username'] = $_POST['username'];
                        echo "Session created: " . $_SESSION['username'] . "<br>";

                        //$date_user_created = hash('gost', $param_date);

                        // echo $username . " date created is: " . $param_date . "<br>";
                        // echo $param_date . " hashed version is: " . $date_user_created . "<br>";
                        // echo $_SESSION['username'] . "<br>";

                        //setcookie($username, $date_user_created, time()+86400);
                        // echo $_COOKIE[$username];

                        header("location: check_login.php");
                        //header("location: game_rdbms.php");
                    } else{
                        // Display an error message if password is not valid
                        $password_err = 'The password you entered was not valid.';
                    }
                }
            } else{
                // Display an error message if username doesn't exist
                $username_err = 'No account found with that username.';
            }
        } else{
            echo "Oops! Something went wrong. Please try again later.";
        }
    }
    // Close statement
    mysqli_stmt_close($stmt);
    // Close connection
    mysqli_close($conn);
}
?>
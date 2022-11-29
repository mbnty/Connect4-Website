<?php

//require_once "login_mysql.php";



// Initialize the session
session_start();
 
// Unset all of the session variables
$_SESSION = array();

if(!isset($_COOKIE[$username])) {
    echo "Cookie named '" . $username . "' is not set!";
} else {
    echo "Cookie '" . $username . "' is set!<br>";
    echo "Value is: " . $_COOKIE[$username];
}

echo "Current session is: " . $_SESSION['username'] . "<br>";
echo "Current cookie username is: " . $_COOKIE['username'] . "<br>";
 
unset($_COOKIE[$username]); //destroys cookie in the session

// Destroy the session.
session_destroy();
 
// Redirect to login page
//header("location: login_mysql.php");
exit;
?>
<?php
// Initialize the session
session_start();

// if(!isset($_COOKIE[$username])) {
//     echo "Cookie named '" . $username . "' is not set!";
// } else {
//     echo "Cookie '" . $username . "' is set!<br>";
//     echo "Value is: " . $_COOKIE[$username];
// }

//echo "Current session is: " . $_SESSION['username'] . "<br>";
//echo "NOW DESTROYING SESSIONS. <br>";

// Unset all of the session variables
$_SESSION = array();
//echo "Current cookie username is: " . $_COOKIE['username'] . "<br>";
 
//unset($_COOKIE[$username]); //destroys cookie in the session

// Destroy the session.
session_destroy();

//echo "Sessions destroyed.";
 
// Redirect to login page
header("location: login.html");
exit;
?>
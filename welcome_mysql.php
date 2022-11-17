<?php
// Initialize the session
session_start();
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['username']) || empty($_SESSION['username'])){
  header("location: login_mysql.php");
  exit;
}
?>
 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Welcome</title>    
</head>
<body>
    <div>
        <h1>Hi, <b><?php echo $_SESSION['username']; ?></b>. Welcome to this site.</h1>
    </div>
    <p><a href="logout_mysql.php">Sign out of your Account</a></p>
</body>
</html>
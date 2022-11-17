<?php
	// Start the session
	session_start();
	// creates a session or resumes the current one based on a session identifier passed via a GET or POST request, or passed via a cookie. 
	// When session_start() is called or when a session auto starts, PHP will call the open and read session save handlers.
?>
<!DOCTYPE html>
<html>
<body>

<?php
	// Set session variables
	$_SESSION["login"] = "hcecotti@csufresno.edu";
	$_SESSION["password"] = "notmyrealpassword";
	echo "Session variables are set.";
?>

</body>
</html>
<?php
	session_start();
	// in order to use the variables you need to start the session
?>
<!DOCTYPE html>
<html>
<body>

<?php
	// Echo session variables that were set with the other page
	if(isset($_SESSION["login"]))	
		echo "Login is " . $_SESSION["login"] . ".<br>";
	else
		echo "Login not defined <br>";
	
	
	if(isset($_SESSION["password"]))
		echo "Password is " . $_SESSION["password"] . ".";
	else	
		echo "Passowrd not defined <br>";
	
	session_destroy(); // Destroys all data registered to a session
	
	// session_destroy: Destroys all data registered to a session
	// session_unset: Frees all session variables
	
?>

</body>
</html>
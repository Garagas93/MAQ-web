<!DOCTYPE html>
<html>
<head>
	<title>login_page</title>
	<link rel="stylesheet" type="text/css" href="utility/bootstrap-3.3.7/dist/css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="css/login_page.css">
	<script type="text/javascript" src="js/global_config.js"></script>
	<script type="text/javascript" src="js/login_page.js"></script>
	<script type="text/javascript" src="utility/jquery-3.2.1.js"></script>
</head>
<?php 
	session_start();
?>
<body onload="load_language(document.title)">
	<div class="container ">
	    <div class="row">
	        <div id="form-login" class="col-md-offset-6 col-md-6">
	            <div class="form-login">
		            <h4 id="login-header"></h4>
		            <label class="control-label" for="username" id="login-username"></label>
		            <input type="text" id="username" class="form-control input-sm chat-input"  required></input>
		            </br>
		            <label class="control-label" for="password" id="login-password"></label>
		            <input type="text" id="password" class="form-control input-sm chat-input" required></input>
		            </br>
		            <div class="wrapper">
			            <span class="group-btn">     
			                <button id ="login-button" onclick="login();" class="btn btn-primary btn-md"></button>
			            </span>
	            	</div>
	            </div>      
	        </div>
	    </div>
	</div>
</body>
</html>
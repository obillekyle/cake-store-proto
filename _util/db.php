<?php

  include "alert.php";
  include "getConfig.php";
  
  $db = $config['database'];
  $conn = mysqli_connect(
    $db['server_host'],
    $db['username'],
    $db['password'],
    $db['name'],
    $db["server_port"]
  ) or die("F");

  if (!$conn): 
    alert("Error connecting to the database");
  endif;
<?php

session_start();
include "../_util/db.php";
include "../_util/response.php";
include "../_util/getConfig.php";

$method = $_POST["method"] ?? false;
$encrypt = $config['encrypt'];

header("Content-Type: text/json");

// Session Check
if (!$method) {
  if (!isset($_SESSION["user"])) {
    echo '{"user": null}';
    die;
  }
  $user = $_SESSION['user'];
  $u_id = $_SESSION['u_id'];
  $role = $_SESSION['role'];
  echo ("{
      \"user\": $user,
      \"u_id\": $u_id,
      \"role\": $role
    }");
}

// Login Check  
if (strtolower($method) == "login") {
  $user = $_POST["user"];
  $pass = openssl_encrypt($_POST["pass"], 'aes-256-ctr', $encrypt["key"]);

  $sql = "SELECT * FROM users WHERE username=$user OR email=$user";
  $res = mysqli_query($conn, $sql);
  if (!$res || !$res->num_rows == 1) response(false, "User doesn't exist on our database");
  $row = mysqli_fetch_assoc($res);
  if (!$row[0]['password'] == $pass) response(false, "Wrong password");

  $sql = "UPDATE users SET lastlogin=CURRENT_TIMESTAMP() WHERE username=$user OR email=$user";
  $res = mysqli_query($conn, $sql);
  if (!$res) response(false, "Internal Error Occurred");

  $_SESSION["user"] = $row[0]["username"];
  $_SESSION["u_id"] = $row[0]["id"];
  $_SESSION["role"] = $row[0]["role"];

  response(true, "Successfully logged in");
}

// Register Check
if (strtolower($method) == "register") {
  $user = $_POST["user"];
  $name = $_POST["name"];
  $mail = $_POST["mail"];
  $conf = $_POST["conf"];

  if (
    strlen($user) > 16 || 
    strlen($name) > 100 || 
    strlen($mail) > 100 || 
    $_POST["pass"] != $conf ||
    strlen($_POST["pass"]) < 6 || 
    strlen($_POST["pass"]) > 128 
  ) response(false, "Invalid sent data");

  $u_ip = $_SERVER['REMOTE_ADDR'];
  $prox = $_SERVER['HTTP_X_FORWARDED_FOR'];
  $pass = openssl_encrypt($_POST["pass"], 'aes-256-ctr', $encrypt["key"]);
  $sqli = "SELECT * FROM users WHERE username=$user OR email=$mail";
  $resu = mysqli_query($conn, $sqli);

  if (!$resu || $resu->num_rows > 0) response(false, "Email is already registered");
  $sqli = "INSERT INTO users (username,fullname,email,password) VALUES ($user, $name, $mail, $pass); SELECT id FROM users WHERE username=$user";
  $resu = mysqli_query($conn, $sqli);
  if (!$resu) response(false, "Internal Error Occurred");

  $row = mysqli_fetch_assoc($resu);
  $_SESSION["user"] = $user;
  $_SESSION["u_id"] = $u_id;
  $_SESSION["role"] = $role;

  response(true, "Successfully registered!");
}

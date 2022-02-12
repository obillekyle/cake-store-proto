<?php

session_start();
include "../_util/db.php";
include "../_util/response.php";

$method = $_POST['method'] ?? false;
header("Content-Type: text/json");

if (isset($_GET['logout'])) {
  session_destroy();
  header("Location: /");
}

// Session Check
if (!$method) {
  if (!isset($_SESSION["user"])) {
    echo(json_encode(
      array(
        "success" => false,
        "message" => "Not logged in",
        "user" => null
      )
    ));
    die;
  }
  $user = $_SESSION['user'];
  $u_id = $_SESSION['u_id'];
  $role = $_SESSION['role'] ?? "Member";
  $json = array(
    "success" => true,
    "message" => "Refreshed profile",
    "user" => $user,
    "u_id" => $u_id,
    "role" => $role
  );
  echo(json_encode($json));
}

// Login Check  
if (strtolower($method) === "login") {
  $user = $_POST["user"];
  $pass = encrypt($_POST["pass"]);
  if (isset($_SESSION["user"])) response(false, "You are already logged in");

  $sql = "SELECT * FROM users WHERE username='$user' OR email='$user'";
  $res = mysqli_query($conn, $sql);
  if (!$res || !$res->num_rows == 1) response(false, "User doesn't exist on our database");
  $row = mysqli_fetch_assoc($res);
  if (!$row['password'] == $pass) response(false, "Wrong password");

  $sql = "UPDATE users SET lastlogin=CURRENT_TIMESTAMP() WHERE username='$user' OR email='$user'";
  $res = mysqli_query($conn, $sql);
  if (!$res) response(false, "Internal Error Occurred");

  $_SESSION["user"] = $row["username"];
  $_SESSION["u_id"] = $row["id"];
  $_SESSION["role"] = $row["role"] ?? "Member";

  response(true, "Successfully logged in");
}

// Register Check
if (strtolower($method) === "register") {
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
  $prox = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? null;
  $pass = encrypt($_POST["pass"]);
  $sqli = "SELECT * FROM users WHERE username='$user' OR email='$mail'";
  $resu = mysqli_query($conn, $sqli);

  if (!$resu || $resu->num_rows > 0) response(false, "Email is already registered");
  $sqli = "INSERT INTO users (ip,username,fullname,email,password,proxy_ip) VALUES ('$u_ip', '$user', '$name', '$mail', '$pass', '$prox')";
  $resu = mysqli_query($conn, $sqli);
  if (!$resu) response(false, "Internal Error Occurred");

  $sqli = "SELECT id FROM users WHERE username='$user'";
  $resu = mysqli_query($conn, $sqli);
  if (!$resu) response(false, "Internal Error Occurred");

  $row = mysqli_fetch_assoc($resu);
  $_SESSION["user"] = $user;
  $_SESSION["role"] = $row['role'] ?? "Member";
  $_SESSION["u_id"] = $row['id'];

  response(true, "Successfully registered! $pass");
}

function encrypt($data) {
  include "../_util/getConfig.php";
  $encrypt = $config['encrypt'];
  error_reporting(0);
  $enc = openssl_encrypt($data, 'aes-256-ctr', $encrypt["key"]);
  error_reporting(1);
  return $enc;
}

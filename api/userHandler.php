<?php

session_start();
if (!isset($_SESSION['role']) && strtolower($_SESSION["role"]) != "admin") response(false, "Not Allowed");


include "../_util/db.php";
include "../_util/response.php";

if (isset($_POST["method"])) {
  $roles = ["Member", "Admin"];
  $method = $_POST["method"] ?? "";

  if ($method == "delete") {
    $ids = join(", ", json_decode($_POST["array"]));
    $sql = "DELETE FROM users WHERE id IN ($ids)";
    $res = mysqli_query($conn, $sql);
    if (!$res) Error2();
    response(true, "Deleted all users with ids: $id");
  }
  if ($method == "edit") {
    $u_id = $_POST["u_id"];
    $name = $_POST["name"];
    $mail = $_POST["mail"];
    $user = $_POST["user"];
    $role = $roles[$_POST["role"]];
    $pass = $_POST["pass"] == "null" ? "" : "password='" + encrypt($_POST['pass']) +"'";
    $jpeg = $_POST["jpeg"] == "null" ? "" : "profile='" + addSlashes($_POST['jpeg']) +"'";

    if (
      strlen($user) > 16 || 
      strlen($name) > 100 || 
      strlen($mail) > 100 || 
      strlen($_POST["pass"]) < 6 || 
      strlen($_POST["pass"]) > 128 ||
      strlen($_POST["jpeg"]) > 1048576 ||
      intval($_POST["role"]) > sizeof($roles) - 1 ||
      preg_match('/[\'^£$%&*()}{@#~?><>,|=_+¬-]/', $name)
    ) response(false, "Invalid sent data");
  
    $sql = "UPDATE users 
            SET username='$user' fullname='$name', $pass,
                email='$mail', role='$role',  $jpeg
            WHERE id = $u_id";
    if (!$res) Error2();
    response(true, "Successfully Edited user with id $u_id");
  }
}

$a = Array("items" => []);

$limit = $_GET["limit"] ?? 10;
$offset = $_GET["offset"] ?? 0;

function Error() {
  global $conn;
  response(false, "Error While Reading User Tables ". mysqli_error($conn));
}

function Error2() {
  global $conn;
  response(false, "Internal Error Occurred" . mysqli_error($conn));
}


$sql = "CREATE TEMPORARY TABLE temp_tb SELECT * FROM users;
        ALTER TABLE temp_tb DROP profile, DROP password;
        SELECT * FROM temp_tb";
$res = mysqli_multi_query($conn, $sql);

if (!mysqli_next_result($conn)) Error();
if (!mysqli_next_result($conn)) Error();

$con = mysqli_store_result($conn);
if (!$con) Error();

while ($row = mysqli_fetch_assoc($con)) array_push($a['items'], $row);

response(true, "OK", $a);

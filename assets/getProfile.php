<?php

  include '../_util/db.php';
  ini_set("display_errors", 1);

  if (!$_GET["user"]) noImage();
  $uid = $_GET['user'];
  $sql = "SELECT id,profile FROM users WHERE id=$uid";
  $res = mysqli_query($conn,$sql);

  if ($res->num_rows > 1) {
    $row = mysqli_fetch_assoc($res);
    if (!$row[0]["profile"]) noImage();
    header("Content-Type: image/jpeg");
    echo $row[0]['profile'];
    die;
  } 
  noImage();

  
  function noImage() {
    header("Content-Type: image/svg+xml");
    fpassthru(fopen("user.svg", 'rb'));
    die;
  }
?>
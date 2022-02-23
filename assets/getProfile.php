<?php

  include '../_util/db.php';
  //ini_set("display_errors", 1);

  if (!isset($_GET["user"])) noImage();

  $pic = $_GET['res'] ?? false;
  $uid = $_GET['user'];
  $sql = "SELECT id,profile FROM users WHERE id=$uid";
  $res = mysqli_query($conn,$sql);

  if ($res->num_rows == 1) {
    $row = mysqli_fetch_assoc($res);
    if (!$row["profile"] || $row["profile"] == "null") noImage(); 
    if (explode(",", $row['profile'], 2)[0] == "data:image/svg+xml;base64") {
      header("Content-type: image/svg+xml");
      echo base64_decode(explode(",", $row['image'], 2)[1]);
      die;
    }
    header("Content-Type: image/jpeg");
    if (!$pic) {
      echo base64_decode(explode(",", $row['profile'], 2)[1]);
      die;
    }
    echo imagejpeg(imagescale(imagecreatefromstring(base64_decode(explode(",", $row['profile'], 2)[1])), -1, $pic));
    die;
  } 
  noImage();

  
  function noImage() {
    header("Content-Type: image/svg+xml");
    fpassthru(fopen("user.svg", 'rb'));
    die;
  }
?>
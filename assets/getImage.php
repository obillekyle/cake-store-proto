<?php

  include '../_util/db.php';
  ini_set("display_errors", 1);

  if (!$_GET["item"]) noImage();
  $uid = $_GET['item'];
  $sql = "SELECT id,image FROM items WHERE id=$uid";
  $res = mysqli_query($conn,$sql);

  if ($res->num_rows > 1) {
    $row = mysqli_fetch_assoc($res);
    if (!$row[0]["image"]) noImage(); 
    header("Content-Type: image/jpeg");
    echo $row[0]['image'];
    die;
  } 
  noImage();

  
  function noImage() {
    header("Content-Type: image/svg+xml");
    fpassthru(fopen("placeholder.svg", 'rb'));
    die;
  }
?>
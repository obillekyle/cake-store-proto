<?php

  include '../_util/db.php';
  $pic = $_GET['res'] ?? false;
  
  if (isset($_GET['logo'])) {
    $image = imagecreatefrompng("logo.png");
    if (!$image) noImage();
    header("Content-type: image/png");
    if (!$pic) {
      imagepng($image);
      die;
    }
    echo imagepng(imagescale($image, -1, $pic));
    die;
  }

  if (!isset($_GET["item"])) noImage();

  $uid = $_GET['item'];
  $sql = "SELECT id,image FROM items WHERE id=$uid";
  $res = mysqli_query($conn,$sql);

  if ($res->num_rows == 1) {
    $row = mysqli_fetch_assoc($res);
    if (!$row["image"] || $row["image"] == "null") noImage(); 
    if (explode(",", $row['image'], 2)[0] == "data:image/svg+xml;base64") {
      header("Content-type: image/svg+xml");
      echo base64_decode(explode(",", $row['image'], 2)[1]);
      die;
    }
    header("Content-Type: image/jpeg");
    if (!$pic) {
      echo base64_decode(explode(",", $row['image'], 2)[1]);
      die;
    }
    echo imagejpeg(imagescale(imagecreatefromstring(base64_decode(explode(",", $row['image'], 2)[1])), -1, $pic));
    die;
  } 
  noImage();

  
  function noImage() {
    header("Content-Type: image/svg+xml");
    fpassthru(fopen("placeholder.svg", 'rb'));
    die;
  }
?>
<?php

session_start();
error_reporting(0);
include "../_util/db.php";
include "../_util/getConfig.php";

$site = $config["site"];
$title = $site["title"];
$user_id = $_SESSION["id"] ?? "";
$username = $_SESSION["user"] ?? "";
$user_role = $_SESSION["role"] ?? "";


function Scripts() {
  ob_start(); 
  ?>
    <link rel="stylesheet" href="/styles/main.css">
  <?php
}

function Nav() {
  global $title, $username;
  ob_start(); 
  ?>
    <nav class="dashboard">
      <img src="/assets/logo.png" class="logo"/>
      <div class="title"><?= $title ?></div>
      <div class="profileHolder" tabindex="0">
        <p><?= $username ?> test</p>
        <img src="/assets/getProfile.php?user=<?=$_SESSION["id"]?>" alt="" class="image"/>
      </div>
    </nav>
  <?php

  return ob_get_clean();
}

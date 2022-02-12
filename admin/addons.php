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
  ?>
    <script defer src="/scripts/util.js"></script>
    <script defer src="/admin/scripts/main.js"></script>
    <script defer src="/admin/scripts/sidebar.js"></script>
    <script src="//code.iconify.design/1/1.0.6/iconify.min.js"></script>
    <link rel="stylesheet" href="/styles/main.css">
    <link rel="stylesheet" href="/admin/styles/main.css">
    <link href="https://res.cloudinary.com/dr6lvwubh/raw/upload/v1581441981/Anicons/anicons-regular.css" rel="stylesheet">
  <?php
}

function Nav() {
  global $title, $username;
  ?>
  <nav class="dashboard main-nav">
    <img src="/assets/logo.png" class="logo"/>
    <div class="title"><?= $title ?></div>
    <div class="profileHolder" tabindex="0">
      <p><?= $username ?></p>
    </div>
  </nav>
  <?php
}

function Sidebar() {
  ?>
    <nav class="sidebar compact">
      <span class="icons sideitem" sidetoggle>D</span>
    </nav>
  <?php
}



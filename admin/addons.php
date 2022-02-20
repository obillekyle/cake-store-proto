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
  global $title;
  ?>

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="<?= $title ?> Dashboard">
    <meta http-equiv="Page-Enter" content="blendTrans(Duration=0)">
    <meta http-equiv="Page-Exit" content="blendTrans(Duration=0)">

    <link rel="icon" type="image/png" href="/assets/logo.png">
    <link href="https://res.cloudinary.com/dr6lvwubh/raw/upload/v1581441981/Anicons/anicons-regular.css" rel="stylesheet">

    <script src="https://code.iconify.design/1/1.0.6/iconify.min.js"></script>
    <script defer src="/scripts/util.js"></script>
    <script defer src="/admin/scripts/main.js"></script>
    <script defer src="/admin/scripts/sidebar.js"></script>
  <?php
}

function Nav() {
  global $title, $username;
  ?>
  <nav class="dashboard main-nav">
    <img src="/assets/logo.png" class="logo" alt=""/>
    <div class="title"><?= $title ?></div>
    <div class="profileHolder" tabindex="0">
      <p><?= $username ?></p>
      <img alt="Account Profile" width="28" height="28"/>
    </div>
  </nav>
  <div id="popups">
  </div>
  <?php
}

function Sidebar() {
  ?>
    <nav id="sidebar">
      <span class="icons sideitem" index="0" tabindex="0" sidetoggle>D</span>
      <div class="sep"></div>
    </nav>
  <?php
}

function Checkbox(string $icon, string $class, string $label, string $id, ?string $color = "", ?string $activeIcon = null, bool $isActive = false) {
  
  if (!$activeIcon) {
    $disabled = "disabled";
    $activeIcon = $icon;
  }
  
  ?>
  <div class="checkbox <?= $class ?>">
    <input type="checkbox" aria-label="<?= $label ?>" id="<?= $id ?>" <?= $isActive ? " checked " : " " . "$disabled"?>/>
    <label for="<?= $id ?>" color="<?= $color ?>">
      <span class="iconify" data-icon="<?= $icon ?>" unchecked></span>
      <span class="iconify" data-icon="<?= $activeIcon ?>" checked></span>
    </label>
  </div>
  <?php
}

function Toggle(string $id, string $class, ?bool $isActive = false, ?string $color = "yellow") {
  
  $active = $isActive ? " checked" : "";

  ?>
  <div class="switch <?= $class ?>">
    <input type="checkbox" id="<?= $id ?>" <?= $active ?>/>
    <label for="<?= $id ?>" color="<?= $color ?>">
      <span class="iconify" data-icon="mdi-toggle-switch-outline" checked></span>
      <span class="iconify" data-icon="mdi-toggle-switch-off-outline" unchecked></span>
    </label>
  </div>
  <?php
}

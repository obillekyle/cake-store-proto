<?php

session_start();

if (!$_SESSION['role'] == "Admin") {
  header("Location: /");
  die;
}
header("Location: dashboard.php");

<?php

  include "../_util/response.php";
  header("Content-Type: text/json");

  session_start();

  if (!isset($_SESSION['user_id']) || !$_GET['item']) response(false, "You must be logged in to do that");
  $user_id = $_SESSION['user_id'];
  $item = $_GET['item'];
  $count = $_GET['quantity'] ?? 1 > 100 ? 1 : $_GET['quantity'];
  
  include "../_util/db.php";

  $sql = "SELECT id,visible FROM items WHERE id=$item, visible=1";
  $res = mysqli_query($conn, $sql);
  if (!$res) response(false);
  if (!$res->num_rows == 1) response(false, "Item not found");
  $sql = "SELECT * FROM cart WHERE item_id=$id AND u_id=$user_id";
  $res = mysqli_query($conn, $sql);
  if (!$res) response(false, "Error occurred while adding this item to the cart");
  if (!$res->num_rows == 1 ) {
    $row = mysqli_fetch_assoc($res);
    $quantity = $row[0]['quantity'] + $count;
    $sql = "UPDATE carts SET quantity = $quantity WHERE item_id=$id AND u_id=$user_id";
    $res = mysqli_query($conn, $sql);
    if (!$res) response(false, "");
    response(true);
  }
  $sql = "INSERT INTO carts (u_id, item_id, quantity) VALUES ($user_id, $id, $quantity)";
  $res = mysqli_query($conn, $sql);
  if (!$res) response(false, "Error occurred while adding this item to the cart");
  response(true, "Successfully added item to cart");
  


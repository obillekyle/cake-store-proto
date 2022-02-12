<?php

  include "../_util/response.php";
  header("Content-Type: text/json");

  session_start();

  if (!isset($_SESSION['u_id']) || !isset($_GET['item'])) response(false, "You must be logged in to do that");
  $u_id = $_SESSION['u_id'];
  $item = $_GET['item'];
  $count = $_GET['quantity'] ?? 1;

  if ($count > 100) response(false, "You are not allowed to add more than 100 items into your cart");
  
  include "../_util/db.php";

  $sql = "SELECT id,visible FROM items WHERE id=$item AND visible=1";
  $res = mysqli_query($conn, $sql);
  if (!$res) response(false, "Internal Error Occurred");
  if (!$res->num_rows === 1) response(false, "Item not found");
  $sql = "SELECT * FROM carts WHERE item_id=$item AND u_id=$u_id";
  $res = mysqli_query($conn, $sql);

  if (!$res) response(false, "Error occurred whilst adding this item to the cart");
  if ($res->num_rows === 1 ) {
    $row = mysqli_fetch_assoc($res);
    $count += $row['quantity'];
    $sql = "UPDATE carts SET quantity=$count WHERE item_id=$item AND u_id=$u_id";
    $res = mysqli_query($conn, $sql);
    if (!$res) response(false, "Internal Error Occurred");
    response(true, "Successfully added this item to the cart");
  }
  $sql = "INSERT INTO carts (u_id, item_id, quantity) VALUES ('$u_id', '$item', '$count')";
  $res = mysqli_query($conn, $sql);
  if (!$res) response(false, "Error occurred while adding this item to the cart");
  response(true, "Successfully added this item to the cart");
  


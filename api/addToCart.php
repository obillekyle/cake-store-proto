<?php

  session_start();
  include "../_util/db.php";
  include "../_util/response.php";


  if (!isset($_SESSION['u_id']) || !isset($_GET['item'])) response(false, "You must be logged in to do that");
  $u_id = $_SESSION['u_id'];
  $item = $_GET['item'];
  $count = $_GET['quantity'] ?? 1;

  if ($count > 100) response(false, "You are not allowed to add more than 100 items into your cart");

  $sql = "SELECT id,visible FROM items WHERE id=$item AND visible=1";
  $res = mysqli_query($conn, $sql);
  if (!$res || !$res->num_rows === 1) response(false, "Internal Error Occurred");

  $sql = "SELECT quantity FROM carts WHERE item_id=$item AND u_id=$u_id";
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
  if (!mysqli_query($conn, $sql)) response(false, "Error occurred while adding this item to the cart");
  response(true, "Successfully added this item to the cart");
  

<?php

session_start();
include "../_util/db.php";
include "../_util/response.php";

$a = Array("items" => []);
if (isset($_SESSION['u_id'])) {
  $userid = $_SESSION['u_id'];

  if (isset($_POST['method'])) {
    $method = $_POST['method'];
    
    if ($method == "update") {
      $itemid = $_POST['item'];
      $value = $_POST['value'];
      $sql = "UPDATE carts SET quantity=$value 
              WHERE id=$itemid AND u_id=$userid";
      if (!mysqli_query($conn, $sql)) response(false, "Modify failed");
      response(true, "Modified item quantity to $value");
    }

    if ($method == "delete") {
      $itemid = join(", ",json_decode($_POST['array']));
      $sql = "DELETE FROM carts WHERE id IN ($itemid) AND u_id=$userid";
      if (!mysqli_query($conn, $sql)) response(false, "Delete Failed"); 
      response(true, "Successfully removed cart items with id $itemid");
    }
  }

  $sql = "SELECT c.id as c_id, i.name, i.price as cost, c.quantity as amnt, u_id, item_id as i_id
          FROM carts AS c
          JOIN users AS u ON u_id = u.id
          JOIN items AS i ON item_id = i.id 
          WHERE u.id = $userid";
  $res = mysqli_query($conn, $sql);
  if (!$res) response(false, "Error while retrieving cart items", $a);
  while ($row = mysqli_fetch_assoc($res)) array_push($a['items'], $row);
  response(true, "OK", $a);
}
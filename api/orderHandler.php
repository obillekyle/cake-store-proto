<?php

include "../_util/db.php";
include '../_util/response.php';
include '../_util/getConfig.php';

session_start();

$a = [];
$currency = $config['site']['currency'];

// Security Check
if (!isset($_SESSION['role']) && $_SESSION['role'] != 'Admin') response(false, "Not Allowed");

if (isset($_POST["method"])) {
  $ids = join(", ", json_decode($_POST["array"] ?? []));
  $method = $_POST["method"] ?? "";
  // Accept Orders
  if ($method == "accept") {
    $sql = "UPDATE orders SET fulfilled=1, denied=0 WHERE id IN ($ids)";
    $res = mysqli_query($conn, $sql);
    if (!$res) response(false, "Error while accepting selected orders");
    response(true, "Set fulfilled to `true`");
  }
  if ($method == "deny") {
    $sql = "UPDATE orders SET fulfilled=0, denied=1 WHERE id IN ($ids)";
    $res = mysqli_query($conn, $sql);
    if (!$res) response(false, "Error while accepting selected orders");
    response(true, "Denied selected orders");
  }
}

// Get all orders that are currently not fulfilled
$sql = "SELECT o.id as o_id, i.id as i_id, i.name, u.username as user,o.details as info, o.quantity as amnt, CONCAT('$currency', o.value) as cost
        FROM orders AS o 
        JOIN items as i ON o.item_id = i.id 
        JOIN users as u ON o.user_id = u.id
        WHERE fulfilled= 0 AND denied=0";
$res = mysqli_query($conn, $sql);
if (!$res) response(false, "Internal Error Occurred ". mysqli_error($conn));
while ($row = mysqli_fetch_assoc($res)) {
  $a = [...$a, $row];
}
response(true, "OK", Array("items" => $a));
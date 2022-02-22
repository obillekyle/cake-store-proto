<?php

include "../_util/db.php";
include '../_util/response.php';
include '../_util/getConfig.php';

session_start();

$a = [];
$currency = $config['site']['currency'];

// Security Check

if (!isset($_SESSION['role'])) response(false, "Not Allowed");
if (isset($_POST["method"])) {
  $method = $_POST["method"] ?? "";
  if ($method == "orderConf") {
    $data = json_decode($_POST["data"]);
    $info = json_decode($_POST["info"]);
    $u_id = $_SESSION['u_id'];
    
    $ids = [];
    $arr = [];
    $items = [];
    $count = [];
    $values = [];
    $prices = [];
    $details = [];
    foreach ($data as $row) {
      array_push($ids, $row->id);
      array_push($items, $row->item);
      array_push($count, $row->amnt);
      array_push($details, $row->info);
    }


    $sql = "SELECT price FROM items WHERE id IN (".join(", ", $items).")";
    $res = mysqli_query($conn, $sql);
    if (!$res || $res->num_rows != count($ids)) response(false, "Internal Error Occurred");
    while ($row = mysqli_fetch_assoc($res)) array_push($arr, ($row['price']));


    for ($i = 0; $i < count($ids); $i++) array_push($prices, $arr[$i] * $count[$i]);
    for ($i = 0; $i < count($ids); $i++) {
      array_push($values, "('".join("', '", [$count[$i],0,0,$items[$i],$details[$i],$prices[$i],$u_id])."')");
    }

    $sql = "INSERT INTO orders (quantity,fulfilled,denied,item_id,details,value,user_id) VALUES ". join(",", $values);
    if (!mysqli_query($conn, $sql)) response(false, "Internal Error Occurred ".mysqli_error($conn));

    $sql = "DELETE FROM carts WHERE id IN (".join(", ", $ids).")";
    if (!mysqli_query($conn, $sql)) response(false, "Internal Error Occurred ".mysqli_error($conn));

    response(true,"Success");
  }

  // Security Check
  if (!isset($_SESSION['role']) && $_SESSION['role'] != 'Admin') response(false, "Not Allowed");
  // Accept Orders
  if ($method == "accept") {
    $ids = join(", ", json_decode($_POST["array"] ?? []));
    $sql = "UPDATE orders SET fulfilled=1, denied=0 WHERE id IN ($ids)";
    $res = mysqli_query($conn, $sql);
    if (!$res) response(false, "Error while accepting selected orders");
    response(true, "Set fulfilled to `true`");
  }
  if ($method == "deny") {
    $ids = join(", ", json_decode($_POST["array"] ?? []));
    $sql = "UPDATE orders SET fulfilled=0, denied=1 WHERE id IN ($ids)";
    $res = mysqli_query($conn, $sql);
    if (!$res) response(false, "Error while accepting selected orders");
    response(true, "Denied selected orders");
  }
  if (!isset($_SESSION['role']) && $_SESSION['role'] != 'Admin') response(false, "Not Allowed");
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
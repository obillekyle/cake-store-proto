<?php 

include "../_util/db.php";
include "../_util/response.php";
header("Content-Type: text/json");
session_start();

// sleep(10);

if (isset($_GET['orders'])) {
  if (isset($_SESSION['role']) && strtolower($_SESSION['role']) === 'admin') {
    $value = $_GET['last'] ?? "month";
    if ($value === 'year')  $value = 365;
    if ($value === "month") $value = 30;
    if ($value === "week")  $value = 7;
    if ($value === 'day')   $value = 1;
    $value = is_int($value) ? $value : 30;
    $sql = "SELECT SUM(quantity) as total, SUM(value) as money FROM orders WHERE fulfilled=1 AND timestamp > DATE_SUB(NOW(), INTERVAL $value DAY)";
    $res = mysqli_query($conn, $sql);
    if (!$res) response(false, mysqli_error($conn));
    $row = mysqli_fetch_assoc($res);
  
    response(true, ($row['total'] ?? 0) . "|" . ($row['money'] ?? 0) );
  }
  response(true, "0|0");
}

if (isset($_GET['totalcart'])) {
  if (isset($_SESSION['role']) && strtolower($_SESSION['role']) === 'admin') {
    $value = $_GET['last'] ?? "month";
    if ($value === 'year')  $value = 365;
    if ($value === "month") $value = 30;
    if ($value === "week")  $value = 7;
    if ($value === 'day')   $value = 1;
    $value = is_int($value) ? $value : 30;
    $sql = "SELECT SUM(quantity) as total FROM carts WHERE timestamp > DATE_SUB(NOW(), INTERVAL $value DAY)";
    $res = mysqli_query($conn, $sql);
    if (!$res) response(false, mysqli_error($conn));
    $row = mysqli_fetch_assoc($res);
    response(true, $row['total'] ?? "0");
  }
  response(true, "0");
}

if (isset($_GET['pending'])) {
  if (isset($_SESSION['role']) && strtolower($_SESSION['role']) === 'admin') {
    $value = $_GET['last'] ?? "month";
    if ($value === 'year')  $value = 365;
    if ($value === "month") $value = 30;
    if ($value === "week")  $value = 7;
    if ($value === 'day')   $value = 1;
    $value = is_int($value) ? $value : 30;
    $sql = "SELECT COUNT(fulfilled) as pending 
            FROM orders 
            WHERE timestamp > DATE_SUB(NOW(), INTERVAL $value DAY) 
              AND fulfilled=0";
    $res = mysqli_query($conn, $sql);
    if (!$res) response(false, mysqli_error($conn));
    $row = mysqli_fetch_assoc($res);
    response(true, $row['pending'] ?? "0");
  }
  response(false, "err");
}

$limit = $_GET['limit'] ?? 10;
$offset = $_GET['o'] ?? 0;

if ($limit > 50) $limit = 10;
if ($offset > 100) $offset = 0;



$sql = "SELECT name,id,description,price,stock 
        FROM items 
        WHERE visible=1 
        LIMIT $limit OFFSET $offset";
$res = mysqli_query($conn, $sql);
if (!$res) response(false, "Error");
$a = [];
while ($row = mysqli_fetch_assoc($res)) {
  // Spread operator, spreads previous array then adds the new item
  // works the same as `array_push($a, $row)`
  $a = [...$a, $row];
}
response(true, "Fetched successfully", Array("items" => $a ));


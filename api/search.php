<?php

include "../_util/db.php";
include "../_util/response.php";
include '../_util/getConfig.php';


session_start();

$a = Array("items" => []);
$search = $_GET["q"] ?? "";
$currency = $config['site']['currency'];

if (!isset($_SESSION['role'])) response(false, "Not Allowed");
if (isset($_GET['page'])) {
  $page = $_GET['page'] ?? ""; 
  $user = $_SESSION["u_id"];

  if ($page == "userOrders") {
    $sql = "SELECT o.id as o_id, fulfilled, o.timestamp as 'time', denied, i.id as i_id, i.name, u.username as user,
                   o.details as 'desc', o.info, o.quantity as amnt, CONCAT('$currency', o.value) as cost
            FROM orders AS o 
            JOIN items as i ON o.item_id = i.id 
            JOIN users as u ON o.user_id = u.id
            WHERE o.user_id=$user HAVING i.name LIKE '%$search%' OR o.details LIKE '%$search%' OR o.info LIKE '%$search%'"; ;
    $res = mysqli_query($conn, $sql);
    if (!$res) response(false, "Internal Error Occurred ".mysqli_error($conn), Array("items" => $a));
    while ($row = mysqli_fetch_assoc($res)) array_push($a['items'], $row);
    response(true, "OK", $a);
  }

  if ($page == "home") {
    $sql = "SELECT name,id,description,price,stock 
        FROM items 
        WHERE visible=1
        HAVING name LIKE '%$search%' OR description LIKE '%$search%'";
    $res = mysqli_query($conn, $sql);
    if (!$res) response(false, "Error");
    $a = Array("items" => []);
    while ($row = mysqli_fetch_assoc($res)) array_push($a['items'], $row);

    response(true, "Fetched successfully", $a );
  }

  // Admin Search
  if (!strtolower($_SESSION['role']) == "admin") response(false, "Not Allowed");
  if ($page == "orders") {
    $sql = "SELECT o.id as o_id, i.id as i_id, i.name, u.username as user,
                    o.details as info, o.quantity as amnt,
                    CONCAT('$currency', o.value) as cost
            FROM orders AS o 
            JOIN items as i ON o.item_id = i.id 
            JOIN users as u ON o.user_id = u.id
            WHERE fulfilled=0 AND denied=0 GROUP BY o_id
            HAVING i.name LIKE '%$search%' OR user LIKE '%$search%' 
                OR o.id LIKE '$search' OR i.id LIKE '$search'";
    $res = mysqli_query($conn, $sql);
    if (!$res) response(false, "Internal Error Occurred ".mysqli_error($conn), Array("items" => $a));
    while ($row = mysqli_fetch_assoc($res)) array_push($a['items'], $row);
    response(true, "OK", $a);
  }
  if ($page == "users") {
    $sql = "CREATE TEMPORARY TABLE temp_tb SELECT * FROM users;
            ALTER TABLE temp_tb DROP profile, DROP password;
            SELECT * FROM temp_tb 
            WHERE username LIKE '%$search%' 
                OR fullname LIKE '%$search%' 
                OR email LIKE '%$search%' 
                OR id LIKE '$search'
            HAVING id !=" . $_SESSION['u_id'];
    $res = mysqli_multi_query($conn, $sql);

    if (!mysqli_next_result($conn)) Error();
    if (!mysqli_next_result($conn)) Error();

    $con = mysqli_store_result($conn);
    if (!$con) Error();

    while ($row = mysqli_fetch_assoc($con)) array_push($a['items'], $row);
    response(true, "OK", $a);
  }

  
  response(false, "Invalid option provided, Expects `orders` got:" . $page, Array("items" => $a));
}

function Error() {
  global $conn;
  response(false, "Error While Reading User Tables ". mysqli_error($conn));
}

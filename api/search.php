<?php

include "../_util/db.php";
include "../_util/response.php";
include '../_util/getConfig.php';


session_start();

$a = [];
$search = $_GET["q"] ?? "";
$currency = $config['site']['currency'];

sleep(2);
if (isset($_GET['page'])) {
  $page = $_GET['page'] ?? ""; 
  if (isset($_SESSION['role']) && 
      strtolower($_SESSION['role']) == "admin") {
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
      while ($row = mysqli_fetch_assoc($res)) {
        $a = [...$a, $row];
      }
      response(true, "OK", Array("items" => $a));
    }
  }
  response(false, "Invalid option provided, Expects `orders` got:" . $page, Array("items" => $a));
}
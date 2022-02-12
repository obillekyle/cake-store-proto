<?php 

include "../_util/db.php";

$limit = $_GET['limit'] ?? 10;  
$offset = $_GET['o'] ?? 0;

if ($limit > 50) $limit = 10;
if ($offset > 100) $offset = 0;

header("Content-Type: text/json");

sleep(1);

$sql = "SELECT name,id,description,price,stock 
        FROM items 
        WHERE visible=1 
        LIMIT $limit OFFSET $offset";
$res = mysqli_query($conn, $sql);
if ($res) {
  $a = [];
  while ($row = mysqli_fetch_assoc($res)) {
    $a = [...$a, $row];
  }
  echo(json_encode($a));
  die;
}
echo "[]";

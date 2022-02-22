<?php

session_start();

header("Content-type: application/json");

include '../_util/db.php';
include '../_util/response.php';
include '../_util/getConfig.php';

$currency = $config['site']['currency'];

if (isset($_POST['method'])) {
  if (!isset($_SESSION["role"]) 
  && $_SESSION["role"] != "admin") response(false, "Not authorized");

  $method = $_POST["method"] ?? "";

  if ($method == "addItem" || $method == "editItem") {
    $i_id = $_POST["id"] ?? 0;
    $cost = $_POST["cost"] ?? 0;
    $show = $_POST["show"] ?? 1;
    $amnt = $_POST["amnt"] ?? 0;
    $desc = addSlashes($_POST["desc"]?? "");
    $name = addSlashes($_POST["name"]?? "?");
    $jpeg = $_POST["jpeg"] == "null" ? NULL : $_POST["jpeg"];

    if ($cost < 0 || $cost > 1000000 ||
        strlen($name) > 100 ||
        strlen($desc) > 2000
        ) response(false, "Invalid data sent");
    if (strlen($jpeg) > 1024576) response(false, "Image must not exceed 1 megabytes");
    
    if ( $i_id <= 0) {
      $sql = "INSERT into items (name, price, description, image, visible, stock) 
              VALUES ('$name', '$cost', '$desc', '$jpeg', '$show', '$amnt')";
      $res = mysqli_query($conn, $sql);
      if (!$res) response(false, "Internal Error ". mysqli_error($conn));
      response(true, "Added `$name` to items, Reloading page");
    }
    $image = "image='$jpeg',";
    if (!$jpeg) $image = "";
    $sql = "UPDATE items 
            SET name='$name', 
                price=$cost, 
                description='$desc', 
                $image 
                visible=$show, 
                stock=$amnt 
            WHERE id=$i_id";
    $res = mysqli_query($conn,$sql);
    if (!$res) response(false, "Internal Error ". mysqli_error($conn));
    response(true, "Edited item with id of `$i_id`, Reloading page");
  }
  if ($method == "delete") {
    $ids = join(", ", json_decode($_POST["array"]));
    $sql = "DELETE FROM items WHERE id IN ($ids)";
    $res = mysqli_query($conn, $sql);
    if (!$res) response(false, "Internal Error ". mysqli_error($conn));
    response(true, "Deleted items with id $ids");
  }
  response(false, "Invalid method provided, Expected `addItem | editItem | delete` but got `$method`");
}

$limit = $_GET['limit'] ?? 10;
$offset = $_GET['o'] ?? 0;

if ($limit > 50) $limit = 10;
if ($offset > 100) $offset = 0;

$sql = "SELECT id, name, CONCAT('$currency', price) as price,
               description, visible, stock 
        FROM items 
        LIMIT $limit OFFSET $offset";
$res = mysqli_query($conn, $sql);
if (!$res) response(false, "Error");
$a = [];
while ($row = mysqli_fetch_assoc($res)) {
  $a = [...$a, $row];
}
response(true, "Fetched successfully", Array("items" => $a ));

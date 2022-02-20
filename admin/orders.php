<?php
  include "addons.php";
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?= $title ?></title>

  <?= Scripts() ?>
  <script defer src="/admin/scripts/getOrders.js"></script>
  <link rel="stylesheet" href="/admin/styles/orders.css">
</head>
<body>
<?php
  Nav();
  Sidebar();
?>
  <main>
    <h1>Orders</h1>

    <actions>
      <label class="button" color="main" tabindex="0">
        <span class="iconify" data-icon="mdi-filter-variant"></span>
        <p>Filter</p>
      </label>
      <form class="search" id="search">
        <input type="text" name="search" tabindex="0" index="1" placeholder="Search"/>
        <button type="submit" tabindex="0" index="1" aria-label="Search Button">
          <span class="iconify" data-icon="mdi-magnify"></span>
        </button>
      </form>
      <label class="button accept" color="green" tabindex="0">
        <span class="iconify" data-icon="mdi-check"></span>
        <p>Fulfill</p>
      </label>
      <label class="button deny" color="red" tabindex="0">
        <span class="iconify" data-icon="mdi-trash-can-outline"></span>
        <p>Reject</p>
      </label>
    </actions>
    <div class="table">
      <header>
        <?= Checkbox("mdi-checkbox-blank-outline", "selAll", "Select all" , "selAll", "", "mdi-checkbox-marked")?>
        <p></p>
        <p>Item</p>
        <div class="username">User</div>
        <div class="quantity">Amount</div>
        <div class="price">Price</div>
        <p></p>
      </header>
      <!-- Items -->
    </div>
  </main>
  
  <template id="card">
    <card tabindex="00">
      <div class="holder">
        <?= Checkbox("mdi-checkbox-blank-outline", "sel", "" , "", "", "mdi-checkbox-marked") ?>
        <div class="id"></div>
      </div>
      <img class="itemImage"></img>
      <div class="itemName"></div>
      <div class="username"></div>
      <div class="quantity"></div>
      <div class="price"></div>
      <?= Checkbox("mdi-chevron-down", "drop", "" , "", "", "mdi-chevron-up") ?>
    </card>
    <detail></detail>
  </template>

</body>
</html>
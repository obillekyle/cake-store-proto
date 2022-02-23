<?php
  include "./_util/addons.php";
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>Orders | <?= $title ?></title>

  <?= Scripts() ?>
  <script defer src="/scripts/loginscreen2.js"></script>
  <script defer src="/scripts/sidebar.js"></script>
  <script defer src="/scripts/orders.js"></script>
  <link rel="stylesheet" href="/styles/orders.min.css">
</head>
<body>
<?php
  Nav();
  Sidebar();
?>
  <main>

    <actions>
      <form class="search" id="search">
        <input type="text" name="search" tabindex="0" index="1" placeholder="Search"/>
        <button type="submit" tabindex="0" index="1" aria-label="Search Button">
          <span class="iconify" data-icon="mdi-magnify"></span>
        </button>
      </form>
    </actions>
    <div class="table">
      <!-- Items -->
    </div>
  </main>

  <template id="card">
    <card tabindex="00">
      <img class="itemImage"></img>
      <div class="holder2">
        <div class="itemName"></div>
        <div class="price"></div>
        <div class="quantity"></div>
      </div>
      <div class="time"></div>
      <?= Checkbox("mdi-chevron-down", "drop", "" , "", "", "mdi-chevron-up") ?>
    </card>
    <detail>
      <label>Informations</label>
      <p class="info"></p>
      <label>Details</label>
      <p class="details"></p>
    </detail>
  </template>

</body>
</html>
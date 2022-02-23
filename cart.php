<?php
  include "./_util/addons.php";
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>🛒 Your Cart | <?= $title ?></title>

  <?= Scripts() ?>
  <script defer src="/scripts/loginscreen2.js"></script>
  <script defer src="/scripts/sidebar.js"></script>
  <script defer src="/scripts/getCart.js"></script>
  <link rel="stylesheet" href="/styles/cart.css">
</head>
<body>
<?php
  Nav();
  Sidebar();
?>
  <main>

    <actions>
      <?= Checkbox("mdi-checkbox-blank-outline", "selAll", "Select all" , "selAll", "", "mdi-checkbox-marked")?>
      <form class="search" id="search">
        <input type="text" name="search" tabindex="0" index="1" placeholder="Search"/>
        <button type="submit" tabindex="0" index="1" aria-label="Search Button">
          <span class="iconify" data-icon="mdi-magnify"></span>
        </button>
      </form>
      <label class="button deny" color="red" tabindex="0">
        <span class="iconify" data-icon="mdi-trash-can-outline"></span>
        <p>Delete</p>
      </label>
    </actions>
    <div class="table">
      <!-- Items -->
    </div>
  </main>
  <footer>
    <label>Total: ₱<n>0</n></label>
    <button outline-button class="check" color="main">Checkout</button>
  </footer>
  
  <template id="card">
    <card tabindex="0">
      <div class="holder">
        <?= Checkbox("mdi-checkbox-blank-outline", "sel", "" , "", "", "mdi-checkbox-marked") ?>
        <div class="id"></div>
      </div>
      <img class="image" alt=""/>
      <div class="holder2">
        <div class="name">IDK</div>
        <div class="price">$69</div>
        <form class="quantity">
          <div class="value">
            <button type="button" class="sub"> - </button>
            <input type="number" min="1" max="100" name="quantity" value="100"/>
            <button type="button" class="add"> + </button>
          </div>
          <button type="submit" class="ok hide">OK</button>
        </form>
      </div>
    </card>
  </template>

</body>
</html>
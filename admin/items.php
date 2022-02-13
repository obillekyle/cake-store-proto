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
</head>
<body>
<?php
  Nav();
  Sidebar();
?>
  <main>
    <h1>Items</h1>
    <items>
      <nav id="navigator">
        <actions>
          <button outline-button color="green" id="additem">
            <span class="iconify" data-icon="mdi-store-plus-outline"></span>
          </button>
        </actions>
      </nav>
      <!-- Items -->
    </items>
  </main>

  <template id="skeleton">
    <div class="card skeleton">
      <div class="image skeleton"></div>
      <div class="name skeleton"></div>
      <div class="price skeleton">FREE</div>
      <p class="description skeleton"></p>
      <div class="addcart skeleton"></div>
    </div>
  </template>
  
  <template id="items">
    <div class="card" tabindex="0">
      <img class="image"></img>
      <span class="name"></span>
      <span class="price"></span>
      <p class="description"></p>
      <div class="actions" tabindex="0">
        <span class="iconify" data-icon="mdi-cart-plus"></span>
        <p class=text>ADD TO CART</p>
      </div>
    </div>
  </template>
  </template>
</body>
</html>
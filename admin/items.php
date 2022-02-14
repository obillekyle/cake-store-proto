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
  <script defer src="/admin/scripts/getDataItems.js"></script>
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
        <input type="checkbox" id="selAll"/>
        <label for="selAll">
          <span class="iconify" unchecked data-icon="mdi-checkbox-blank-outline"></span>
          <span class="iconify" checked data-icon="mdi-checkbox-marked"></span>
        </label>
        <label for="filterby">Filter by:</label>
        <select color="cyan" id="filterby">
          <option value="item">Id           </option>
          <option value="name">Item Name    </option>
          <option value="desc">Description  </option>
          <option value="cost">Price        </option>
          <option value="date">Creation Date</option>
        </select>
        <actions>
        <button outline-button color="blue" id="selitem">
            <span class="iconify" data-icon="mdi-pencil-outline"></span>
          </button>
          <button outline-button color="green" id="additem">
            <span class="iconify" data-icon="mdi-store-plus-outline"></span>
          </button>
          <button outline-button color="red" id="remitem">
            <span class="iconify" data-icon="mdi-trash-can-outline"></span>
          </button>
          <input type="checkbox" id="selAll"/>
        </actions>
      </nav>
      <div class="all">
        <!-- Items -->

      </div>
    </items>
  </main>

  <template id="skeleton">
    <div class="item skeleton">
      <input type="checkbox" disabled>
      <label>
        <span class="iconify" data-icon="mdi-checkbox-blank" unchecked></span>
      </label>
      <div class="image skeleton"></div>
      <div class="name skeleton"></div>
      <div class="price skeleton">FREE</div>
      <p class="description skeleton"></p>
      <div class="addcart skeleton"></div>
    </div>
  </template>
  
  <template id="items">
    <div class="item" tabindex="0">
      <input type="checkbox">
      <label>
        <span class="iconify" data-icon="mdi-checkbox-blank-outline" unchecked></span>
        <span class="iconify" data-icon="mdi-checkbox-marked" checked></span>
      </label>
      <img class="image"></img>
      <span class="name"></span>
      <span class="price"></span>
      <p class="description"></p>
      <actions>
        <input type="checkbox" class="dropdown">
        <label class="dropdownlabel">
          <span class="iconify" unchecked data-icon="mdi-dots-vertical-circle-outline"></span>
          <span class="iconify" checked data-icon="mdi-dots-vertical-circle"></span>
        </label>
      </actions>
    </div>
  </template>
  </template>
</body>
</html>
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
        
        <?= Checkbox("mdi-checkbox-blank-outline", "", "", "selAll", "yellow", "mdi-checkbox-marked") ?>
        
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
        </actions>
        <?= Checkbox("mdi-chevron-down", "toggle-float", "", "toggle-float", "red", "mdi-chevron-up") ?>
        <div class="dropdown" id="actions-float">
          
        </div>
      </nav>
      <div class="all">
        <!-- Items -->

      </div>
    </items>
  </main>

  <template id="skeleton">
    <div class="item skeleton">
      <div class="checkbox sel">
      <input type="checkbox" disabled>
      <label>
        <span class="iconify" data-icon="mdi-checkbox-blank" unchecked></span>
      </label>
      </div>
      <div class="image skeleton"></div>
      <div class="name skeleton"></div>
      <div class="price skeleton">FREE</div>
      <p class="description skeleton"></p>
      <div class="addcart skeleton"></div>
    </div>
  </template>
  
  <template id="items">
    <div class="item" tabindex="0">
      <?= Checkbox("mdi-checkbox-blank-outline", "sel", "", "", "yellow", "mdi-checkbox-marked") ?>
      <img class="image"></img>
      <span class="name"></span>
      <span class="price"></span>
      <p class="description"></p>
      <actions>
        <?= Checkbox("mdi-chevron-down", "options", "", "", "yellow", "mdi-chevron-up") ?>
      </actions>
    </div>
  </template>

  <template id="entry">
    <div id="overlay">
        <form id="createItem">
          <h2>Create New Store Items</h2>
          <div class="image">
            <input type="file" name="jpeg" id="jpeg" required placeholder="Image" accept="image/*">
            <label outline-button tabindex="0" color="blue" for="jpeg">
              <span class="iconify" data-icon="mdi-image-outline"></span>
            </label>
          </div>
          <input type="text" name="name" id="name" required max="100" placeholder="Item name"/>
          <input type="number" name="cost" id="cost" required placeholder="Price"/>
          <textarea name="desc" id="desc" required placeholder="Description"></textarea>
          <div class="actions">
            <button outline-button type="button" color="red" class="closeModal">
              <span class="iconify" data-icon="mdi-close"></span>
              <p>Close</p>
            </button>
            <button outline-button type="submit" name="submit" color="green" class="send">
              <span class="iconify" data-icon="mdi-check"></span>
              <p>Submit</p>
            </button>
          </div>
        </form>
    </div>
  </template>
</body>
</html>

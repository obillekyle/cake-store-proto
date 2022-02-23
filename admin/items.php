<?php
  include $_SERVER["DOCUMENT_ROOT"] . "/_util/addons.php";
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?= $title ?></title>
  <?= Scripts() ?>
  <script defer src="/admin/scripts/main.js"></script>
  <script defer src="/admin/scripts/sidebar.js"></script>
  <link rel="stylesheet" href="/admin/styles/items.min.css">
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
        
        <?= Checkbox("mdi-checkbox-blank-outline", "selAll", "", "selAll", "", "mdi-checkbox-marked") ?>
        <total>
          <p> Total items: </p>
        </total>
        <actions>
          <button outline-button color="blue" id="edititem">
            <span class="iconify" data-icon="mdi-pencil-outline"></span>
          </button>
          <button outline-button color="green" id="additem">
            <span class="iconify" data-icon="mdi-store-plus-outline"></span>
          </button>
          <button outline-button color="red" id="delitem">
            <span class="iconify" data-icon="mdi-trash-can-outline"></span>
          </button>
        </actions>
      </nav>
      <div class="all">
        <nav id="detail">
          <p></p>
          <p> </p>
          <p>Details</p>
          <p>Price</p>
          <p>Visibility</p>
          <p>Stock</p>
        </nav>
        <!-- Items -->

      </div>
    </items>
  </main>

  <!-- Templates -->

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
      <div class="visibility skeleton"></div>
      <div class="stock skeleton"></div>
    </div>
  </template>
  
  <template id="items">
    <div class="item" tabindex="0">
      <?= Checkbox("mdi-checkbox-blank-outline", "sel", "", "", "", "mdi-checkbox-marked") ?>
      <img class="image"></img>
      <span class="name"></span>
      <span class="price"></span>
      <p class="description"></p>
      <div class="visibility"></div>
      <div class="stock"></div>
    </div>
  </template>

  <template id="entry">
    <div id="overlay">
      <form id="createItem">
        <h2>Create New Store Items</h2>
        <div class="image">
          <input type="file" name="jpeg" id="jpeg" placeholder="Image" accept="image/*">
          <label outline-button tabindex="0" color="blue" for="jpeg">
            <span class="iconify" data-icon="mdi-image-outline"></span>
          </label>
        </div>
        <input type="text" name="name" id="name" required max="100" placeholder="Item name"/>
        <input type="number" name="cost" id="cost" required placeholder="Price"/>
        <textarea name="desc" id="desc" required placeholder="Description"></textarea>
        <other>
          <div class="option">
            <?= Toggle("show", "visible", true, "orange") ?>
            <label for="show">Is Visible</label>
          </div>
          <input type="number" name="amnt" id="amnt" placeholder="Initial Stock"/>
        </other>
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

  <template id="entryEdit">
    <div id="overlay">
      <form id="editItem">
        <h2>Edit Item</h2>
        <div class="image">
          <input type="file" name="jpeg" id="jpeg" placeholder="Image" accept="image/*">
          <label outline-button tabindex="0" color="blue" for="jpeg">
            <span class="iconify" data-icon="mdi-image-outline"></span>
          </label>
        </div>
        <input type="text" name="name" id="name" required max="100" placeholder="Item name"/>
        <input type="number" name="cost" id="cost" required placeholder="Price"/>
        <textarea name="desc" id="desc" required placeholder="Description"></textarea>
        <other>
          <div class="option">
            <?= Toggle("show", "visible", true, "orange") ?>
            <label for="show">Is Visible</label>
          </div>
          <input type="number" name="amnt" id="amnt" placeholder="Initial Stock"/>
        </other>
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

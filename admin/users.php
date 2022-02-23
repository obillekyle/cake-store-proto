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
  <script defer src="/admin/scripts/getUsers.js"></script>
  <link rel="stylesheet" href="/admin/styles/users.min.css">
</head>
<body>
<?php
  Nav();
  Sidebar();
?>
  <main>
    <h1>Users</h1>

    <actions>
      <label data-disabled class="button" color="main" tabindex="0">
        <span class="iconify" data-icon="mdi-filter-variant"></span>
        <p>Filter</p>
      </label>
      <form class="search" id="search">
        <input type="text" name="search" tabindex="0" index="1" placeholder="Search"/>
        <button type="submit" tabindex="0" index="1" aria-label="Search Button">
          <span class="iconify" data-icon="mdi-magnify"></span>
        </button>
      </form>
      <label class="button delete" color="red" tabindex="0">
        <span class="iconify" data-icon="mdi-trash-can-outline"></span>
        <p>Purge</p>
      </label>
    </actions>
    <div class="table">
      <header>
        <?= Checkbox("mdi-checkbox-blank-outline", "selAll", "Select all" , "selAll", "", "mdi-checkbox-marked")?>
        <p></p>
        <p>Name</p>
        <div class="username">Username</div>
        <div class="email">Email</div>
        <div class="role">Role</div>
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
      <img class="profile"></img>
      <div class="fullName"></div>
      <div class="username"></div>
      <div class="email"></div>
      <div class="role"></div>
      <?= Checkbox("mdi-chevron-down", "drop", "" , "", "", "mdi-chevron-up") ?>
    </card>
    <detail></detail>
  </template>

</body>
</html>
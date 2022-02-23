<?php
  include "./_util/addons.php";
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title><?=$_SESSION['user']?>'s Profile | <?= $title ?></title>

  <?= Scripts() ?>
  <script defer src="/scripts/loginscreen2.js"></script>
  <script defer src="/scripts/sidebar.js"></script>
  <script defer src="/scripts/user.js"></script>
  <link rel="stylesheet" href="/styles/profile.min.css">
</head>
<body>
<?php
  Nav();
  Sidebar();
?>
  <main>
    <h1>Account</h1>
    <card>
      <div class="image"></div>
      <h2 class="name"><?= $_SESSION['name'] ?></h2>
      <p class="user"><?= $_SESSION['user'] ?></p>
      <p class="mail"><?= $_SESSION['mail'] ?></p>
    </card>
  </main> 
</body>
</html>
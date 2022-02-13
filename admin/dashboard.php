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
  <script defer src="/admin/scripts/getDashData.js"></script>
</head>
<body>
<?php
  Nav();
  Sidebar();
?>
  <main>
    <h1 class="subtitle">Dashboard</h1>

    <p><?= $title ?> Sales</p>
    <select id="chart-sales">
      <option value="month">Last 30 days</option>
      <option value="week">Last 30 weeks</option>
      <option value="day">Last 24 hours</option>
      <option value="year">Last 1 year</option>
    </select>
    <sales>
      <orders class="info">
        <span class="iconify" data-icon="mdi-shopping-outline"></span>
        <p class="info-title">Total Orders</p>
        <p class="info-value">...</p>
      </orders>

      <cartitems class="info">
        <span class="iconify" data-icon="mdi-cart-check"></span>
        <p class="info-title">Items in Users' Cart</p>
        <p class="info-value">...</p>
      </cartitems>

      <earnings class="info">
        <span class="iconify" data-icon="mdi-cash-multiple"></span>
        <p class="info-title">Total Earnings</p>
        <p class="info-value">...</p>
      </earnings>
    </sales>
  </main>
</body>
</html>
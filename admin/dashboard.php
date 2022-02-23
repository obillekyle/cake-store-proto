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
  <link rel="stylesheet" href="/admin/styles/dashboard.min.css">
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
      <option value="week">Last weeks</option>
      <option value="day">Last 24 hours</option>
      <option value="year">Last year</option>
    </select>
    <div id="sales">
      
      <cartitems class="info">
        <span class="iconify" data-icon="mdi-cart-check"></span>
        <p class="info-title">Items in Users' Cart</p>
        <p class="info-value">...</p>
      </cartitems>

      <pending class="info" color="red">
        <span class="iconify" data-icon="mdi-update"></span>
        <p class="info-title">Pending orders</p>
        <p class="info-value">...</p>
      </pending>
      
      <orders class="info" color="cyan">
        <span class="iconify" data-icon="mdi-shopping-outline"></span>
        <p class="info-title">Total Orders</p>
        <p class="info-value">...</p>
      </orders>

      <earnings class="info" color="yellow">
        <span class="iconify" data-icon="mdi-cash-multiple"></span>
        <p class="info-title">Total Earnings</p>
        <p class="info-value">...</p>
      </earnings>
    </div>
  </main>
</body>
</html>

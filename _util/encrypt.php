<?php

include "getConfig.php";

function encrypt($data) {
  global $config;
  $encrypt = $config['encrypt'];
  error_reporting(0);
  $enc = openssl_encrypt($data, 'aes-256-ctr', $encrypt["key"]);
  error_reporting(1);
  return $enc;
}
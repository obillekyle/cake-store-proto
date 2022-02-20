<?php
  function response(bool $success, ?string $reason = null, ?array $array = Array()) {
    header("Content-Type: application/json");
    $res = $success ? true : false;
    $json = Array (
      "success" => $res,
      "message" => $reason,
      ...$array
    );
    echo json_encode($json, JSON_PRETTY_PRINT);
    die;
  }

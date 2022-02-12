<?php
  function response(bool $success, ?string $reason = null) {
    $res = $success ? 'true' : 'false';
    echo 
    "{
      \"success\": $res, 
      \"message\": \"$reason\"
    }";
    die;
  }

<?php

  $config = parse_ini_file($_SERVER["DOCUMENT_ROOT"]."/_conf/server.conf",true);

  if ($config['site']['error_reporting'] === "true") {
    ini_set( "display_errors", 0 );
    error_reporting(0);
  }
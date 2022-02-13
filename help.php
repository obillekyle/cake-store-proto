<?php 

  // Edit the site settings at "/_conf/server.conf"
  
  // Nullish Coalescing (??)
  $value = $_GET["value2"] ?? 0;
  // uses the value after the symbol if the first value is null
  // prevents errors in production user accidentally passes a null value

  // Ternary operator ( x ? t : f )
  $value === 1 ? 1 : $value;
  // x         ? t : f
  // one line if statement
  // `x` is the statement
  // `t` will be returned if the statement is true
  // and `f` if it isn't
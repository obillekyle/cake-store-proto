

  # **Edit the site settings at "/_conf/server.conf"**

  ## <ins>**Features** 

  💪 Flexible\
  ⏱️ Responsive\
  🔧 Configurable\
  📝 Crud Complete\
  🔒 Built with security in mind\
  &nbsp;


  # **Guides to survive my code**

  ### **Nullish Coalescing (`??`)**
  ```php
  $value = $_GET["value2"] ?? 0;
  ```
  ```js 
  let value = null ?? "💪";
  // Returns 💪;
  ```
  uses the value after the symbol if the first value is null\
  prevents errors in production if the user accidentally passes a null value
  \
  &nbsp;
  ### **Ternary operator (`bool` or `statement` ? `true` : `false`)**
  ```php
  $final = $value === 1 ? 1 : $value;
  //          x         ? t : f
  ```
  ```js
  var final = value === 1 ? 1 : value;
  //            x         ? t : f
  ```
  one line if statement\
  `x` is the statement\
  `t` will be returned if the statement is true\
  and `f` if it isn't

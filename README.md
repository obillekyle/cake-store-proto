

  # **Edit the site settings at "/_conf/server.conf"**

  ## <ins>**Features** 

  💪 Flexible\
  ⏱️ Responsive\
  🔧 Configurable\
  📝 Crud Complete\
  &nbsp;

  # Requirements 
  <ins> **SERVER**
  * PHP 7.4 or later
  * Apache Server
  * MySQL Server
  * phpMyAdmin
  * php gd extension

  <ins>**FOR EDITING**
  * Visual Studio Code Editor
  * Live Sass Compiler
  * NodeJS

  ### <ins>**Addons - addons.php**

  * `Nav()` - Builds sites navigation
  * `Sidebar()` - builds sidebar
  * `Scripts()` - Adds default scripts and meta tags

  # APIS
  1. `/assets/getImage.php` 
      * Gets the image of an item
      * **param** `item=int`: item id
      * **param** `res=int`: image height resolution
      * Usage [localhost/assets/getItem.php?item=1&res=100](localhost/assets/getItem.php?item=1&res=100)
  1. `/assets/getProfile.php` 
      * Gets the profile of a user
      * **param** `user=int`: user id
      * **param** `res=int`: image height resolution
      * Usage [localhost/assets/getProfile.php?user=1&res=100](localhost/assets/getProfile.php?user=1&res=100)
  1. `/assets/captcha.php` - unused
      * Generates a random captcha image
      * Usage [localhost/assets/captcha.php](localhost/assets/captcha.php)

  # Installation

  * Extract the zip file into the apache root directory
  * Start the apache server and mysql server
  * Open phpMyAdmin, create a database named **store** 
  * Open the new database and click import on the top of the page
  * Import the shop.sql file into the database by uploading the file and clicking go on the very bottom of the page.
  * Edit the configuration file located in **/_conf/server.conf** and set the mysql credentials there

  ## <ins>Other
  * Do not remove the file named .htaccess, it is there to prevent users from accessing certain files that must be only be seen by the server.
  * It is safe to remove `tsconfig.json` and other files that are ending with .ts.
  * Do not directly modify css files when changing styles, you must modify all files ending with .scss. Install this [Live Sass Compiler](https://marketplace.visualstudio.com/items?itemName=glenn2223.live-sass) automatically compile modified scss files
  

<?php 

session_start();
  
$captcha = rand(1000, 9999);
$_SESSION["captcha"] = $captcha; 

$im = imagecreatetruecolor(50, 24); 
 
$r = rand(0,255);
$g = rand(0,255);
$b = rand(0,255);

$bg = imagecolorallocate($im, $r, $g, $b);
$fg = imagecolorallocate($im, 0, 0, 0);
imagefill($im, 0, 0, $bg);
  
imagettftext($im, rand(8, 11), rand(-12, 12), rand(5, 20), rand(12, 20), $fg,"./zxx-noise.ttf",$captcha);

header("Cache-Control: no-store, no-cache, must-revalidate");
header('Content-type: image/png');
imagepng($im);
imagedestroy($im);
?>
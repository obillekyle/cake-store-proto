var start = performance.now();
function addCart(id) {
  fetch(`/api/addToCart.php?item=${id}`)
    .then(res => res.json())
    .then(data => {
      console.log(data.message)
      if (data.success) {
        popup(data.message, "verbose");
        return true;
      }
      popup(data.message, "error");
      return false;
    })
}
perf("Loaded addCart.js", start);
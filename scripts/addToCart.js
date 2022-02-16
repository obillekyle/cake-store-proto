
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
    }).catch(err => {
      popup("Failed to add this item into the cart", "error")
    })
}

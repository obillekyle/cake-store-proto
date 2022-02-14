
loadData()

document.body.addEventListener("change", e => {
  if (e.target.matches("#chart-sales")) {
    loadData?.();
    return;
  }
})

function loadData() {
  const order = document.querySelector("orders");
  const money = document.querySelector("earnings")
  const carts = document.querySelector("cartitems");
  const value = order.querySelector(".info-value");
  const price = money.querySelector(".info-value");
  const items = carts.querySelector(".info-value");
  value.innerText = "...";
  price.innerText = "...";
  items.innerText = "...";

  // get dropdown value that is located to the dashboard
  var salesinfo = document.querySelector("select#chart-sales");
  // Fetch orders data and money value
  fetch(`/api/getItems.php?orders=true&last=${salesinfo.value}`)
    .then(res => res.json())
    .then(data => { 
      if (!data.success) {
        popup(data.message, "warn");
        return;
      }
      const final = data.message.split("|");
      value.innerText = final[0];
      price.innerText = final[1];

    })

  // fetch total carts
  fetch(`/api/getItems.php?totalcart=true&last=${salesinfo.value}`)
    .then(res => res.json())
    .then(data => {
      if (!data.success) {
        popup(data.message, "warn");
        return;
      }
      items.innerText = data.message;
    })
}

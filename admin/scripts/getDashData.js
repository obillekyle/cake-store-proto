
loadData()

document.body.addEventListener("change", e => {
  if (e.target.matches("#chart-sales")) {
    loadData?.()
    return
  }
})

function loadData() {
  const order = document.querySelector("orders")
  const money = document.querySelector("earnings")
  const carts = document.querySelector("cartitems")
  const stale = document.querySelector("pending")
  const value = order.querySelector(".info-value")
  const price = money.querySelector(".info-value")
  const items = carts.querySelector(".info-value")
  const oPend = stale.querySelector(".info-value")
  value.innerText = "..."
  price.innerText = "..."
  items.innerText = "..."
  oPend.innerText = "..."

  // get dropdown value that is located to the dashboard
  var salesinfo = document.querySelector("select#chart-sales")
  // Fetch orders data and money value
  fetch(`/api/getItems.php?orders=true&last=${salesinfo.value}`)
    .then(res => res.json())
    .then(data => { 
      if (!data.success) {
        popup(data.message, "warn")
        return
      }
      const final = data.message.split("|")
      value.animateValue( 0, final[0], 1000)
      price.animateValue( 0, final[1], 1000)

    }).catch(err => {
      popup("An Error Occurred, please check the console for more details", "error")
      throw err;
    })

  // fetch total carts
  fetch(`/api/getItems.php?totalcart=true&last=${salesinfo.value}`)
    .then(res => res.json())
    .then(data => {
      if (!data.success) {
        popup(data.message, "warn")
        return
      }
      items.animateValue( 0, data.message, 1000)
    }).catch(err => {
      popup("An Error Occurred, please check the console for more details", "error")
      throw err;
    })

  fetch(`/api/getItems.php?pending=true&last=${salesinfo.value}`)
    .then(res => res.json())
    .then(data => {
      if (!data.success) {
        popup(data.message, "warn")
        return
      }
      oPend.animateValue( 0, data.message, 1000)
    }).catch(err => {
      popup("An Error Occurred, please check the console for more details", "error")
      throw err;
    })
}

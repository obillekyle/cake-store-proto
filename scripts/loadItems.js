var start = performance.now()
const container = document.querySelector("#container")
for (let i = 0; i < 10; i++) {
  const skeleton = document.querySelector("#skeleton").content.cloneNode(true)
  const card = skeleton.querySelector(".card")
  const name = skeleton.querySelector('.name')
  const desc = card.querySelector('.description')
  name.style.width = random(60, 100) + "%"
  desc.style.width = random(50, 100) + "%"
  container.append(card)
}

fetch("/api/getItems.php")
.then(res => res.json())
.then(dat => build(dat))
.catch(err => {
  console.log(err)
  popup("Server not Available, Please reload the page", "error")
})

function build(data) {
  if (!data.success) {
    popup(data.message, "warn")
    return;
  }
  container.innerHTML = "";
  data.items.forEach( 
    item => {

      const items = document.querySelector("#items").content.cloneNode(true)
      const iCard = items.querySelector(".card")
      const title = items.querySelector(".name")
      const price = items.querySelector(".price")
      const iDesc = items.querySelector(".description")
      const image = items.querySelector(".image")
      const aCart = items.querySelector(".addcart")

      var add = () => addCart(item.id) 
      iCard.setAttribute("data-id", item.id)
      aCart.onclick = add
      iDesc.innerText = item.description
      title.textContent = item.name
      price.textContent = "₱" + item.price

      image.src = `/assets/getImage.php?item=${item.id}&res=300`
      container.append(items)
      
    }
  )
}


  document.body.addEventListener("submit", e => {
    if (e.target.matches("#search")) {
      e.preventDefault();
      const button = e.target.querySelector("button");
      const search = e.target.querySelector("input").value;
  
      const html = button.innerHTML;
  
      button.disabled = true;
      button.innerHTML = `
      <span class="iconify loading" data-icon="mdi-autorenew"></span>
      `
  
      const reset = () => {
        button.innerHTML = html;
        button.disabled = false;
      }
  
      fetch("/api/search.php?q=" + search + "&page=home")
      .then(res => res.json())
      .then(data => {
        reset();
        build(data)
      })
      .catch(err => {
        popup("An Error occurred. Please check the console for further details",  "error");
        reset();
        throw err;
      })
    }
  })
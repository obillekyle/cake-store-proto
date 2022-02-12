var start = performance.now()
const container = document.querySelector("#container");
for (let i = 0; i < 10; i++) {
  const skeleton = document.querySelector("#skeleton").content.cloneNode(true);
  const card = skeleton.querySelector(".card");
  const name = skeleton.querySelector('.name');
  const desc = card.querySelector('.description');
  name.style.width = random(60, 100) + "%";
  desc.style.width = random(50, 100) + "%";
  container.append(card);
}

fetch("/api/getItems.php")
  .then(res => res.json())
  .then(data => {
    data.forEach( 
      item => {
        container.innerHTML = '';

        const items = document.querySelector("#items").content.cloneNode(true);
        const iCard = items.querySelector(".card");
        const title = items.querySelector(".name");
        const price = items.querySelector(".price");
        const iDesc = items.querySelector(".description");
        const image = items.querySelector(".image");
        const aCart = items.querySelector(".addcart");

        var add = () => addCart(item.id); 
        iCard.setAttribute("data-id", item.id);
        aCart.onclick = add;
        title.textContent = item.name;
        price.textContent = "$" + item.price;
        iDesc.textContent = item.description;

        image.src = `/assets/getImage.php?item=${item.id}`;
        container.append(items)
        
      }
    );
    perf("Fetched Items", start);

  });




perf("Loaded loadItems.js", start)
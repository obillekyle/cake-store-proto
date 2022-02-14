var start = performance.now()
const container = document.querySelector(".all");
for (let i = 0; i < 10; i++) {
  const skeleton = document.querySelector("#skeleton").content.cloneNode(true);
  const card = skeleton.querySelector(".item");
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
        container.querySelectorAll(".skeleton").forEach( skeleton => {
          skeleton.remove();
        });

        const items = document.querySelector("#items").content.cloneNode(true);
        const iCard = items.querySelector(".item");
        const title = items.querySelector(".name");
        const price = items.querySelector(".price");
        const iDesc = items.querySelector(".description");
        const image = items.querySelector(".image");
        const check = items.querySelector("input[type=checkbox]");
        const label = items.querySelector("label");

        iCard.setAttribute("data-id", item.id);
        label.setAttribute("for", "item_" + item.id);
        
        title.textContent = item.name;
        price.textContent = "$" + item.price;
        iDesc.textContent = item.description;
        
        check.id = "item_" + item.id;
        image.src = `/assets/getImage.php?item=${item.id}`;
        container.append(items)
        
      }
    );
    perf("Fetched Items", start);
  });
  
perf("Loaded loadItems.js", start)
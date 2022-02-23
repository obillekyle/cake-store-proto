fetch("/api/orderHandler.php?orders=true")
.then(res => res.json())
.then(dat => build(dat))


function build(data) {
  if (!data.success) {
    popup(data.message, "warn")
    return;
  }
  document.querySelectorAll("card, detail").remove()
  data.items.forEach((item, i) => {
    const container = document.querySelector(".table")
    const card = document.querySelector("#card").content.cloneNode(true)
    const main = card.querySelector("card")
    const img1 = card.querySelector(".itemImage")
    const name = card.querySelector(".itemName")
    const amnt = card.querySelector(".quantity")
    const cost = card.querySelector(".price")
    const drop = card.querySelector("detail")
    const time = card.querySelector(".time")
    const desc = card.querySelector("detail .details")
    const info = card.querySelector("detail .info")

    amnt.textContent = "x"+item.amnt
    name.textContent = item.name ?? "??"
    cost.textContent = item.cost ?? "??"
    desc.innerText = item.desc ?? ""
    info.innerText = item.info ?? ""
    time.innerText = item.time ?? ""

    main.dataset.id = item.o_id ?? "??"
    main.setAttribute("index", i + 1)
    img1.alt = item.name + " Image"
    img1.src = `/assets/getImage.php?item=${item.i_id}&res=75`
    drop.dataset.id = item.o_id;

    card.querySelector(".drop>input").id = "drop_" + item.o_id
    card.querySelector(".drop>input").ariaLabel = "Show more details for " + item.name + " with id " + item.o_id;
    card.querySelector(".drop>label").setAttribute("for", "drop_" +item.o_id)

    container.append(card);

  })
}

function toggle(id) {
  const info = document.querySelector(`detail[data-id="${id}"]`) 
  info.classList.toggle("show", document.querySelector("#drop_" + id).checked);
}

const events = ["click", "change"]
events.forEach( c =>
  document.body.addEventListener( c , e => {
    if (e.target.id.split("_")[0] == "drop" || e.target.matches("card")) {
      if (e.target.matches("card")) {
        const d_id = e.target.dataset.id
        const drop = document.querySelector("#drop_" + d_id)
        drop.checked = !drop.checked;
        toggle(d_id);
        return;
      }
      toggle(e.target.id.replace("drop_", ""));
    }
  })
);

document.body.addEventListener("submit", e => {
  if (e.target.matches(".search")) {
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

    fetch("/api/search.php?q=" + search + "&page=userOrders")
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
fetch("/api/orderHandler.php")
.then(res => res.json())
.then(data => build(data))    
.catch(err => {
  popup("An Error occurred. Please check the console for further details",  "error");
  throw err;
})


function toggle(id) {
  const info = document.querySelector(`detail[data-id="${id}"]`) 
  info.classList.toggle("show", document.querySelector("#drop_" + id).checked);
}

function build(data) {
  if (!data.success) {
    popup(data.message, "warn")
    return;
  }
  document.querySelectorAll("card").remove()
  data.items.forEach((item, i) => {
    const container = document.querySelector(".table")
    const card = document.querySelector("#card").content.cloneNode(true)
    const main = card.querySelector("card")
    const img1 = card.querySelector(".itemImage")
    const name = card.querySelector(".itemName")
    const user = card.querySelector(".username")
    const amnt = card.querySelector(".quantity")
    const cost = card.querySelector(".price")
    const info = card.querySelector("detail")

    amnt.textContent = item.amnt
    name.textContent = item.name ?? "??"
    user.textContent = item.user ?? "??"
    cost.textContent = item.cost ?? "??"
    info.textContent = item.info ?? ""

    main.dataset.id = item.o_id ?? "??"
    main.setAttribute("index", i + 1)
    img1.alt = item.name + " Image"
    img1.src = `/assets/getImage.php?item=${item.i_id}&res=75`
    info.dataset.id = item.o_id;

    card.querySelector(".sel>input").id = "order_" + item.o_id
    card.querySelector(".drop>input").id = "drop_" + item.o_id
    card.querySelector(".sel>input").ariaLabel = "Select "+ item.name+" with id " + item.o_id;
    card.querySelector(".drop>input").ariaLabel = "Show more details for " + item.name + " with id " + item.o_id;
    card.querySelector(".sel>label").setAttribute("for", "order_" +item.o_id)
    card.querySelector(".drop>label").setAttribute("for", "drop_" +item.o_id)

    container.append(card);

  })
}

function confirm(elem, method) {
  const html = elem.innerHTML; 
  const form = new FormData;
  
  const reset = () => {
    elem.innerHTML = html
    elem.disabled = false;
  }
  
  elem.disabled = true;
  elem.innerHTML = "Processing..."
  
  const array = []
  document.querySelectorAll("[id^='order_']:checked").forEach( elem => {
    const id = elem.id.split("_")[1];
    array.push(id);
  })
  
  console.log(array);
  form.append("method", method);
  form.append("array", JSON.stringify(array))

  fetch("/api/orderHandler.php", {
    method: "POST",
    body: form
  })
  .then(res => res.json())
  .then(data => {
    if (!data.success) {
      popup(data.message, "warn");
      reset();
      return;
    }
    array.forEach( id => {
      document.querySelector("[data-id='" + id +"']").remove();
    })
    reset();
    closeOverlay();
    popup(data.message, "verbose")
  })
  .catch(err => {
    popup("Internal Error Occurred, please check the console for more details.", "error");
    throw err;
  })
}


// Events
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
    if (e.target.matches(".accept")) {
      const elems = document.querySelectorAll("[id^=order_]:checked")
      if (elems.length < 1) {
        popup("You must have at least one selected order to do that", "warn")
        return;
      }
      const overlay = document.createElement("div")

      overlay.id = "overlay";
      overlay.innerHTML = `
        <div id="confirm">
          <h2>Fulfill selected orders?</h2>
          <div>
            <button id="fyes" outline-button color="red">Yes</button>
            <button class="closeModal" color="green" outline-button>No</button>
          </div>
        </div>
      `
      document.body.append(overlay);
    }
    if (e.target.matches(".deny")) {
      const elems = document.querySelectorAll("[id^=order_]:checked")
      if (elems.length < 1) {
        popup("You must have at least one selected order to do that", "warn")
        return;
      }
      const overlay = document.createElement("div")

      overlay.id = "overlay";
      overlay.innerHTML = `
        <div id="confirm">
          <h2>Reject selected orders?</h2>
          <div>
            <button id="dyes" outline-button color="red">Yes</button>
            <button class="closeModal" color="green" outline-button>No</button>
          </div>
        </div>
      `
      document.body.append(overlay);
    }
    if (e.target.matches("#fyes")) {
      confirm(e.target, "accept")
      return;
    }
    if (e.target.matches("#dyes")) {
      confirm(e.target, "deny")
      return;
    }
  })
)

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

    fetch("/api/search.php?q=" + search + "&page=orders")
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
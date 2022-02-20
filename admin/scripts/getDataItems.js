var start = performance.now()
const container = document.querySelector(".all")
for (let i = 0; i < 10; i++) {
  const skeleton = document.querySelector("#skeleton").content.cloneNode(true)
  const card = skeleton.querySelector(".item")
  const name = skeleton.querySelector('.name')
  const desc = card.querySelector('.description')
  name.style.width = random(60, 100) + "%"
  desc.style.width = random(50, 100) + "%"
  container.append(card)
}

fetch("/api/itemHandler.php")
  .then(res => res.json())
  .then(data => {
    if (!data.success) {
      popup(data.message, "warn");
      return;
    } 
    container.querySelectorAll(".skeleton").forEach( skeleton => {
      skeleton.remove()
    })
    if  (data.items.length === 0) {
      popup("No found items", "info");
      return;
    }
    data.items.forEach( 
      item => {

        const items = document.querySelector("#items").content.cloneNode(true)
        const iCard = items.querySelector(".item")
        const title = items.querySelector(".name")
        const price = items.querySelector(".price")
        const iDesc = items.querySelector(".description")
        const image = items.querySelector(".image")
        const check = items.querySelector(".sel")
        const stock = items.querySelector(".stock")
        const shown = items.querySelector(".visibility")
        const label = check.querySelector("label")
        const iShow = document.createElement("span");


        iCard.setAttribute("data-id", item.id)
        iCard.setAttribute("data-info", JSON.stringify(item));
        label.setAttribute("for", "item_" + item.id)
        check.querySelector("input").id = "item_" + item.id

        iShow.classList.add("iconify");
        iShow.style.color = item.visible == 1 ? "green" : "red"; 
        iShow.dataset.icon = item.visible == 1 ? "mdi-eye" : "mdi-eye-off-outline"
        
        stock.innerText = item.stock
        title.innerText = item.name
        iDesc.innerText = item.description
        price.innerText = item.price.replace("\n", "");
        
        image.src = `/assets/getImage.php?item=${item.id}&res=110`

        shown.append(iShow)
        container.append(items)
        
      }
    )
  })

document.body.addEventListener("click", e => {
  if (e.target.matches("#additem, #additem *")) {
    const modal = document.querySelector("template#entry")
    const overlay = document.querySelector("#overlay")
    if (!overlay && !e.target.matches(".closeModal, .closeModal *")) {
      document.body.append(modal.content.cloneNode(true))
      return
    }
    closeOverlay()
  }

  // Delete Item
  if (e.target.matches("#delitem, #delitem *")) {
    const selected = document.querySelectorAll(".sel > input:checked");
    if (selected.length <= 0) {
      popup("You must have at least one selection to do that", "warn")
      return;
    }
    const overlay =  document.createElement("div")

    overlay.id = "overlay";
    overlay.innerHTML = `
      <div id="deleteItem">
          <h2>Delete Selected?</h2>
          <div>
            <button id="delConfirm" special-button color="red">Yes</button>
            <button class="closeModal" color="green" special-button>No</button>
          </div>
      </div>
    `
    document.body.append(overlay)
  }


  // Edit Item
  if (e.target.matches("#edititem, #edititem *")) {
    const selected = document.querySelectorAll(".sel > input:checked")
    if (selected.length != 1 ) {
      popup("You must only have one selection to edit", "warn")
      return;
    }
    const overlay = document.querySelector("#entryEdit").content.cloneNode(true)
    const item_id = selected[0].id.split("item_", 2)[1];
    const element = document.querySelector('[data-id="' + item_id + '"]');
    const itemInf = JSON.parse(element.dataset.info);

  
    const name = overlay.querySelector("#name");
    const desc = overlay.querySelector("#desc");
    const cost = overlay.querySelector("#cost");
    const amnt = overlay.querySelector("#amnt");
    const show = overlay.querySelector("#show");
    const jpeg = overlay.querySelector("label[for='jpeg']");
    
    name.value = itemInf.name;
    amnt.value = itemInf.stock;
    desc.value = itemInf.description;
    show.checked = Boolean(itemInf.visible);
    cost.value = itemInf.price.replace("$\n", "");
    
    jpeg.innerHTML = ""
    overlay.querySelector("#editItem").dataset.id = itemInf.id;
    jpeg.style.backgroundImage = `url(/assets/getImage.php?item=${itemInf.id})`;

    document.body.append(overlay)

  }

  // Confirm Delete
  if (e.target.matches("#delConfirm")) {
    const selected = document.querySelectorAll(".sel > input:checked");
    const array = [];
    const dForm = new FormData()
    selected.forEach( elem => array.push(elem.id.split("item_")[1]))
  
    dForm.append("method", "delete")
    dForm.append("array", JSON.stringify(array))
  
    fetch("/api/itemHandler.php", {
      method: "POST",
      body: dForm
    })
    .then(res => res.json())
    .then(data => {
      if (!data.success) {
        popup(data.message, "warn")
        return;
      }
      popup(data.message, "verbose")
      array.forEach(id => {
        document.querySelector(`[data-id="${id}"]`).remove();
      })
      closeOverlay();
    })
  }
})

  
document.body.addEventListener("change", e=> {
  if (e.target.matches("#selAll")) {
    const checked = e.target.checked
    const element = document.querySelectorAll(".sel")

    element.forEach(e => {
      e.querySelector("input").checked = checked
    })
  }
  if (e.target.matches(".sel input:not(:checked)")) {
    const checked = document.querySelector("#selAll").checked
    if (checked) {
      document.querySelector("#selAll").checked = false
    }
  }
  if (e.target.matches("#jpeg")) {
    const label = document.querySelector("label[for=jpeg]")
    const image = e.target.files[0]
    label.innerHTML = ""
    label.style.backgroundImage = "url(" + URL.createObjectURL(image) +")"
  }
})

document.body.addEventListener("submit", e => {
  if (e.target.matches("#createItem, #editItem")) {
    e.preventDefault()

    if (e.target.matches("#editItem")) {
      process(e.target, e.target.dataset.id)
      return;
    }
    process(e.target);

  }
})

function process(element, id) {

  const send = element.querySelector(".send")
  const name = element.querySelector("#name")
  const desc = element.querySelector("#desc")
  const cost = element.querySelector("#cost")
  const jpeg = element.querySelector("#jpeg")
  const amnt = element.querySelector("#amnt");
  const show = element.querySelector("#show");
  const img1 = new FileReader();
  const form = new FormData();
  const html = send.innerHTML
  var result = null;
  
  send.disabled = true
  send.innerHTML = "Processing.."
  
  const reset = () => {
    send.innerHTML = html
    send.disabled = false
  }
  
  if (cost.value < 0 || cost.value > 1000000) {
    popup("Item price must not be lower than 0 nor higher than 1000000");
    reset();
    return;
  }
  if (name.value.length > 100) {
    popup("Item names can't be longer than 100 characters");
    reset();
    return;
  }
  if (desc.value.length > 2000) {
    popup("Description can't be longer than 2000 characters");
    reset();
    return;
  }

  if (jpeg.files.length > 0) {
    img1.onloadend = () => {
      result = img1.result;
      sendReq();
    }
    img1.readAsDataURL(jpeg.files[0])
    return;
  }
  sendReq();

  function sendReq() {
    id ? form.append("id", id) : null;
    form.append("jpeg", result)
    form.append("name", name.value)
    form.append("desc", desc.value)
    form.append("cost", cost.value)
    form.append("amnt", amnt.value)
    form.append("show", show.checked ? 1 : 0)
    form.append("method", element.matches("#createItem") ? "addItem" : "editItem")
  
    fetch("/api/itemHandler.php", {
      method: "POST",
      body: form
    })
    .then(res => res.json())
    .then(data => {
      if (!data.success) {
        popup(data.message, "warn")
        reset();
        return;
      }
      popup(data.message, "verbose");
      setTimeout(function () {
        location.reload();
      }, 500)
    })
    .catch(err => {
      reset();
      popup("An Error Occurred, please check the console for more details", "error")
      throw err;
    })
  }
}


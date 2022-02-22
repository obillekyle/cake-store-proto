/// <reference path="../index.d.ts" />

fetch("/api/cartHandler.php")
.then(resu => resu.json())
.then(data => build(data))

function build(data) {
  if (!data.success) {
    popup(data.message, "warn")
    return;
  }

  data.items.forEach((item, i) => {
    const container = document.querySelector(".table")
    const card = document.querySelector("#card").content.cloneNode(true)
    const main = card.querySelector("card")
    const img1 = card.querySelector(".image")
    const name = card.querySelector(".name")
    const cost = card.querySelector(".price")
    const amnt = card.querySelector(".quantity")
    const numb = card.querySelector(".value input")

    amnt.id = "cart_" + item.c_id
    numb.setAttribute("value", item.amnt)

    name.innerText = item.name ?? "??"
    cost.innerText = item.cost ?? "??"
  
    main.dataset.id = item.c_id ?? "??"
    main.dataset.item = item.i_id ?? "??";
    img1.alt = item.name + " Image"
    img1.src = `/assets/getImage.php?item=${item.i_id}&res=200`

    card.querySelector(".sel>input").id = "card_" + item.c_id
    card.querySelector(".sel>input").ariaLabel = "Select "+ item.name+" with id " + item.c_id;
    card.querySelector(".sel>label").setAttribute("for", "card_" +item.c_id)

    container.append(card);
  })
}



["click", "change"].forEach( c => 
  document.addEventListener(c, e => {
    if (e.target.disabled) return;
    if (e.target.matches(".value *")) {
      console.log("e");
      const form = e.target.parentMatches("form")
      const input = form.querySelector("input");
      const button = form.querySelector(".ok")
      if (input.value === input.getAttribute("value")) {
        button.classList.toggle("hide", true);
        return;
      }
      button.classList.toggle("hide", false);
    }
  })
)

document.addEventListener("submit", e => {
  if (e.target.id.split("_")[0] == "cart") {
    e.preventDefault();
    const form = new FormData();
    const input = e.target.querySelector("input")
    const value = input.value;
    const button = e.target.querySelector(".ok");

    button.innerHTML = "...";
    button.disabled = true;

    const reset = () => {
      button.innerHTML = "OK";
      button.disabled = false;
    }

    form.append("method", "update");
    form.append("item", e.target.id.split("_")[1])
    form.append("value", input.value);

    fetch("/api/cartHandler.php", {
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
      reset();
      input.value = value;
      popup(data.message, "verbose");
      input.setAttribute("value", input.value);
      button.classList.add("hide");
    })
  }
});


["change", "click", "submit"].forEach( events => 
  document.addEventListener( events , e => {
    if (e.target.id.split("_")[0] == "card" || e.target.matches(".quantity, .selAll *")) {
    const array = [];
    document.querySelectorAll(".sel input").forEach(elem => {
      if (elem.checked) {
        const price = elem.parentMatches("card").querySelector(".price").textContent;
        let amount = elem.parentMatches("card").querySelector(".value input")
        if (e.type == "submit") amount = amount.value;
        else amount = amount.getAttribute("value");
        array.push(parseInt(amount) * parseInt(price));
      }
    })
    const sum = array.reduce((prev, current) => prev + current ,0)
    document.querySelector("footer n").textContent = sum
    }
  })
)

document.addEventListener("click", e => {
  if (e.target.disabled) return;
  // Checkout
  if (e.target.matches(".check")) {
    if (document.querySelectorAll(".sel input:checked").length < 1) {
      popup("You must have at least one cart item selected", "warn")
      return;
    }
    const overlay = document.createElement("div");
    overlay.id = "overlay";
    overlay.innerHTML = `
      <div id="order">
        <h2>Order</h2>
        <div class="items table">
          <!-- Items -->
          <card class="info">
            <h3>Details</h3>
            <input type="text" id="name" placeholder="Recipient Name">
            <input type="number" id="phone" placeholder="Phone Number">
            <textarea id="address" placeholder="Address"></textarea>
          </card>
          <sep></sep>
        </div>
        <footer>
          <method>
            <p>Payment Method</p>
            <select outline-button color="main">
              <option value="0">Cash On Delivery</option>
            </select>
          </method>
          <label>Total: ₱<n>${document.querySelector("footer n").innerText}</n></label>
          <button outline-button color="main">Place Order</button>
        </footer>
      </div>
      `
    const items = overlay.querySelector(".items")
    
    document.querySelectorAll(".sel input:checked")
    .forEach((e) => {
      const card = e.parentMatches("card").cloneNode(true);
      const info = document.createElement("textarea");
      const form = card.querySelector("form");
      const inpt = card.querySelector(".value input")
      card.querySelector(".holder").remove()
      
      form.innerText = "x" + inpt.getAttribute("value")
      info.placeholder = "How you'd like this item turned out when shipped"
      
      info.required = true;
      card.removeAttribute("tabindex")

      card.append(info)
      items.append(card);
    })
    document.body.append(overlay);
  }
  // Delete button
  if (e.target.matches(".deny")) {
    if (document.querySelectorAll(".sel input:checked").length < 1) {
      popup("You must have at least one cart item selected", "warn")
      return;
    }
    const overlay = document.createElement("div");
    overlay.id = "overlay";
    overlay.innerHTML = `
      <div id="confirm">
        <h2>Delete Selected Cart Items?</h2>
        <div>
          <button outline-button color="red" class="yes">Yes</button>
          <button outline-button color="green" onclick="closeOverlay()">No</button>
        </div>
      </div>
    `
    document.body.append(overlay);
  }
  // Delete Confirm button
  if (e.target.matches(".yes")) {
    if (document.querySelectorAll(".sel input:checked").length < 1) {
      popup("You must have at least one cart item selected", "warn")
      return;
    }

    const form = new FormData();
    const html = e.target.innerHTML
    const check = document.querySelectorAll(".sel input:checked")

    e.target.innerHTML = "Processing.."
    e.target.disabled = true;

    const reset = () => {
      e.target.innerHTML = html;
      e.target.disabled = false;
    }

    const ids = check.toArray().reduce((a, e) => {
      return [...a, e.parentMatches("card").dataset.id]
    },[])


    form.append("method", "delete")
    form.append("array", JSON.stringify(ids))

    fetch("/api/cartHandler.php", {
      method: "POST",
      body: form,
    })
    .then(res => res.json())
    .then(data => {
      if (!data.success) {
        popup(data.message, "warn")
        return;
      }
      check.forEach( e => e.parentMatches("card").remove())
      popup(data.message, "verbose")
      closeOverlay();
      reset();
    })
  }
  // Place Order
  if (e.target.matches("#overlay footer button"))  {
    const form = new FormData();
    const cards = document.querySelectorAll("#overlay card[data-id]")
    const html = e.target.innerHTML;
    const iName = document.querySelector("#overlay .info #name")
    const phone = document.querySelector("#overlay .info #phone")
    const address = document.querySelector("#overlay .info #address")

    e.target.disabled = true;
    e.target.innerText = "Processing...";
    const reset = () => {
      e.target.innerText = html;
      e.target.disabled = false;
    }

    if (cards.length < 1) {
      popup("Do not remove card items onto the dom", "warn")
      return;
    }
    const data = cards.toArray().reduce((a, e) => {
      return [
        ...a, 
        {
          id: e.dataset.id, 
          item: e.dataset.item,
          info: e.querySelector("textarea").value,
          amnt: e.querySelector(".quantity").innerText.replace("x", "")
        }
      ]
    }, [])
    const info = {
      name: iName.value,
      phone: phone.value,
      address: address.value
    }

    if (info.name.length > 100 || info.name.length < 6) {
      popup("Please provide a real name, not providing a real name can get your order declined", "warn")
      iName.style.border = "1px solid orangered";
      reset();
      return;
    }

    if (info.phone.length < 9 || info.phone.length > 11 ) {
      popup("Invalid phone number", "warn")
      phone.style.border = "1px solid orangered";
      reset();
      return;
    }

    if (info.address.length < 20 || info.address.length > 200) {
      popup("Invalid address", "warn")
      address.style.border = "1px solid orangered";
      reset();
      return;
    }

    form.append("method", "orderConf")
    form.append("info", JSON.stringify(info))
    form.append("data", JSON.stringify(data))

    fetch("/api/orderHandler.php", {
      method: "POST",
      body: form
    })
    .then(res => res.json())
    .then(dat => {
      if (!dat.success) {
        popup(dat.message, "error")
        reset();
        return;
      }
      reset();
      popup(dat.message, "success")
      data.forEach( d => document.querySelectorAll(".table card[data-id='"+ d.id +"']").remove())
      showSuccess();
    }).catch(err => {
      reset();
      popup("Internal Error Occurred, please check the console for more details", "error")
      throw err;
    })
  }
})

function showSuccess() {
  let overlay = document.querySelector("#overlay")
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "overlay"
  }

  overlay.innerHTML = `
    <div class="#confirm">
      <h2>Order Placed Successfully</h2>

    </div>
  `
}
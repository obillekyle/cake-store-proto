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
})
;




["change", "click"].forEach( events => 
  document.addEventListener( events , e => {
    if (e.target.id.split("_")[0] == "card" || e.target.matches(".value *")) {
    const array = [];
    document.querySelectorAll(".sel input").forEach(e => {
      if (e.checked) {
        const price = e.parentMatches("card").querySelector(".price").textContent;
        const amount = e.parentMatches("card").querySelector(".value input").value;
        array.push(parseInt(amount) * parseInt(price));
      }
    })
    const sum = array.reduce((prev, current) => prev + current ,0)
    document.querySelector("footer n").textContent = sum
    }
  })
)
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

fetch("/api/getItems.php")
  .then(res => res.json())
  .then(data => {
    data.forEach( 
      item => {
        container.querySelectorAll(".skeleton").forEach( skeleton => {
          skeleton.remove()
        })

        const items = document.querySelector("#items").content.cloneNode(true)
        const iCard = items.querySelector(".item")
        const title = items.querySelector(".name")
        const price = items.querySelector(".price")
        const iDesc = items.querySelector(".description")
        const image = items.querySelector(".image")
        const check = items.querySelector(".sel")
        const aDrop = items.querySelector(".options")
        
        const label = check.querySelector("label")
        const aIcon = aDrop.querySelector("label")

        iCard.setAttribute("data-id", item.id)
        label.setAttribute("for", "item_" + item.id)
        aIcon.setAttribute("for", "drop_" + item.id)
        check.querySelector("input").id = "item_" + item.id
        aDrop.querySelector("input").id = "drop_" + item.id
        
        title.textContent = item.name
        price.textContent = item.price
        iDesc.textContent = item.description
        
        image.src = `/assets/getImage.php?item=${item.id}`
        container.append(items)
        
      }
    )
  })


function closeOverlay() {
  const overlay = document.querySelector("#overlay")
  overlay?.classList.add("hideOverlay")
}

document.body.addEventListener("click", e => {
  if (e.target.matches("#additem, #additem *, .closeModal, .closeModal *")) {
    const modal = document.querySelector("template#entry")
    const overlay = document.querySelector("#overlay")
    if (!overlay && !e.target.matches(".closeModal, .closeModal *")) {
      document.body.append(modal.content.cloneNode(true))
      return
    }
    closeOverlay()
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
  console.log("hello")
  if (e.target.matches("#createItem")) {
    e.preventDefault()

    const send = e.target.querySelector(".send")
    const name = e.target.querySelector("#name")
    const desc = e.target.querySelector("#desc")
    const cost = e.target.querySelector("#cost")
    const jpeg = e.target.querySelector("#jpeg")
    const html = send.innerHTML

    send.disabled = true
    send.innerHTML = "Processing.."
    console.log("hello")

    fetch("/api/itemHandler.php")
    .then(res => res.json())
    .catch(err => {
      send.innerHTML = html
      send.disabled = false
      popup("An Error Occurred, please check the console for more details %c" + err, "error")
    })
  }
})

document.body.addEventListener("transitionend", e=> {
  if (e.target.matches(".hideOverlay")) {
    e.target.remove()
  }
})



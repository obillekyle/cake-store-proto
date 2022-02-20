fetch("/api/userHandler.php")
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
    const img1 = card.querySelector(".profile")
    const name = card.querySelector(".fullName")
    const user = card.querySelector(".username")
    const mail = card.querySelector(".email")
    const role = card.querySelector(".role")
    const info = card.querySelector("detail")

    mail.innerText = item.email
    role.innerHTML = item.role == "Member" ? 
      "<span class='iconify' data-icon='mdi-account' color='green'></span>" : 
      "<span class='iconify' data-icon='mdi-card-account-details-outline' color='orange'> </span>"
    name.innerText = item.fullname ?? "??"
    user.innerText = item.username ?? "??"
    info.innerText = `
      Account Created: ${item.accountcreation}\n 
      LastLogin: ${!item.lastlogin ? item.accountcreation : item.lastlogin}\n
      IP Address: ${item.ip.replace("::1", "127.0.0.1")} | Proxy: ${item.proxy_ip.length < 1 ? "none" : item.proxy_ip}
    `

    main.dataset.id = item.id ?? "??"
    main.setAttribute("index", i + 1)
    img1.alt = item.username + " Image"
    img1.src = `/assets/getProfile.php?user=${item.id}&res=75`
    info.dataset.id = item.id;

    card.querySelector(".sel>input").id = "user_" + item.id
    card.querySelector(".drop>input").id = "drop_" + item.id
    card.querySelector(".sel>input").ariaLabel = "Select "+ item.username+" with id " + item.id;
    card.querySelector(".drop>input").ariaLabel = "Show more details for " + item.username + " with id " + item.id;
    card.querySelector(".sel>label").setAttribute("for", "order_" +item.id)
    card.querySelector(".drop>label").setAttribute("for", "drop_" +item.id)

    container.append(card);
  })
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
)

function toggle(id) {
  const info = document.querySelector(`detail[data-id="${id}"]`) 
  info.classList.toggle("show", document.querySelector("#drop_" + id).checked);
}
fetch("/api/userHandler.php")
.then(resu => resu.json())
.then(data => build(data))

function build(data) {
  if (!data.success) {
    popup(data.message, "warn")
    return;
  }

  document.querySelectorAll("card, detail").remove()
  document.querySelector(".selAll input").checked = false;
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
    card.querySelector(".sel>label").setAttribute("for", "user_" +item.id)
    card.querySelector(".drop>label").setAttribute("for", "drop_" +item.id)

    container.append(card);
  })
}

const events = ["click", "change"]
events.forEach( c =>
  document.body.addEventListener( c , e => {
    if (e.target.disabled || e.target.matches("[data-disabled]")) return
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
    if (e.target.matches(".delete")) {
      if (!document.querySelector(".sel input:checked")) {
        popup("You must have at least one user selected to purge", "warn");
        return;
      }
      let overlay = document.querySelector("#overlay")
      if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = "overlay";
        document.body.append(overlay);
      }
    
      overlay.innerHTML = `
        <div id="confirm">
          <h2>Purge Selected Users</h2>
          <p>All of their orders and cart items will be deleted</p>
          <div>
            <button outline-button color="red" class="dyes">Yes</button>
            <button outline-button color="green" onclick="closeOverlay()">No</button>
          </div>
        </div>
      `
    }
    if (e.target.matches("#overlay .dyes")) {
      const ids = [];
      const form = new FormData();
      document.querySelectorAll(".sel input:checked").forEach( e => {
        ids.push(e.parentMatches("card").dataset.id);
      })

      e.target.innerHTML = "Processing..."
      e.target.disabled = true;

      const reset = () => {
        e.target.innerHTML = "Yes";
        e.target.disabled = false;
      }

      form.append("array", JSON.stringify(ids));
      form.append("method", "delete");

      fetch("/api/userHandler.php", {
        method: "POST",
        body: form
      })
      .then( res => res.json())
      .then( data => {
        if (!data.success) {
          popup(data.message, "error");
          reset();
          return;
        }

        popup(data.message, "verbose");
        setTimeout(_ => location.reload(), 500)
        reset();

      }).catch(err => {
        popup("Internal Error Occurred, please check the console for more details", "error");
        reset();
        throw err;
      })
    }
  })
);

function toggle(id) {
  const info = document.querySelector(`detail[data-id="${id}"]`) 
  info.classList.toggle("show", document.querySelector("#drop_" + id).checked);
}

document.body.addEventListener("submit", e => {
  if (e.target.disabled || e.target.matches("[data-disabled]")) return
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

    fetch("/api/search.php?q=" + search + "&page=users")
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
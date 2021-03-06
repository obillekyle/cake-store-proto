var start = performance.now()
let login = false

// Check if there is user signed in
checkLogin()
function checkLogin() {
  fetch("/api/loginHandler.php")
    .then((res) => res.json())
    .then((data) => {
      const pHolder = document.querySelector(".profileHolder")
      const contain = document.querySelector(".loginModal, .dropdown")
      if (contain) contain.remove()
      if (!data.user) {
        location = "/"; 
        return
      }

      const name = pHolder.querySelector("p");
      let pImg;
      if (pHolder.querySelector("img")) {
        pImg = pHolder.querySelector("img");
      } else {
        pImg = document.createElement("img");
        pImg.width = "28"
        pImg.height = "28"
        pImg.alt = "Account Profile"
        pHolder.append(pImg);
      }
      pImg.src = `/assets/getProfile.php?user=${data.u_id}`
      name.textContent = data.user

      const dropdown = () => {
        getDropdown(data.role)
      }

      pHolder.onclick = dropdown
      login = true
    }).catch(err => {
      popup("Error occurred whilst contacting the server", "error")
      throw err;
    })
}
  
  // Dropdown Options
function getDropdown(role) {

  if (document.querySelector(".dropdown")) {
    document.querySelector(".dropdown").classList.toggle("hidden")
    return
  }

  if (!role) {
    document.querySelector(".dropdown").remove()
    document.querySelector(".profileHolder").onclick = openLogin
    return
  } 

  var options = [
    {
      name: "Home Page",
      link: "/",
      icon: "mdi-home-outline",
    },
    {
      name: "Profile",
      link: "/user.php",
      icon: "mdi-account-outline"
    },
    {
      name: "Logout",
      clickFn: () => {
        fetch("/api/loginHandler.php?logout=true")
          .then(setTimeout(_ => checkLogin(), 100))
          .catch(e => {
            popup("Server is not available", "warn")
          })
      },
      icon: "mdi-logout-variant",
    },
  ]
  
  const dropdown = document.createElement("div")
  if (role.toLowerCase() === "admin")
    options = [
      {
        name: "Go to Dashboard",
        link: "/admin/dashboard.php",
        icon: "mdi-arrow-right-bold-hexagon-outline",
      },
      {
        name: "sep",
      },
      ...options,
    ]

  options.forEach(option => {
    if (option.name === "sep") {
      const item = document.createElement("div")
      item.className = "separator"
      dropdown.append(item)
      return
    }

    
    const clickFn = option.link ? () => {
      location = option.link
    } : option.clickFn

    const item = document.createElement("div")
    const icon = document.createElement("span")
    const name = document.createElement("p")

    item.tabIndex = "6"
    item.onclick = clickFn
    icon.className = "iconify"
    item.className = "optioncard"
    name.innerText = option.name
    icon.dataset.icon = option.icon

    item.append(icon)
    item.append(name)
    dropdown.append(item)
  })

  dropdown.classList.add("dropdown")
  const nav = document.querySelector(".main-nav")
  document.body.insertBefore(dropdown, nav.nextSibling)
}

const loginscreen = `
  <form id="login">
    <label for="l-username">Username or Email</label>
    <input id="l-username" type="text" min="3" max="100" required/> 
    <label for="l-password">Password</label>
    <input type="password" id="l-password" min="6" max="128" required/>
    <button type="submit" special-button name="submit">Login</button>
    <label class="reg" tabindex="6" onclick="register()">Register Instead</label>
  </form>
`

const registerscreen = `
  <form id="register">
    <label for="fullname">Full name</label>
    <input id="fullname" type="text" min="3" max="100" required/>

    <label for="username">Username</label>
    <input id="username" type="text" min="3" max="16" required/>

    <label for="usermail"/>Email</label>
    <input id="usermail" type="email" max="100" required/>

    <label for="password">Password</label>
    <input type="password" id="password" min="6" max="128" required/>
    <label bar="password"></label>

    <label for="confpass">Confirm Password</label>
    <input type="password" id="confpass" min="6" max="128" required/>

    <button type="submit" special-button data-disabled="true" disabled name="submit">Register</button>
    <label class="login" tabindex="6" onclick="switchlogin()">Go back to Login</label>

  </form>
`

function openLogin(user) {
  if (user) {
    popup("You are already logged in", "warn")
    return
  }
  if (document.querySelector(".loginModal")) {
    const container = document.querySelector(".loginModal")
    container.remove()
    return
  }
  const container = document.createElement("div")
  container.className = "loginModal"
  container.innerHTML = loginscreen
  const nav = document.querySelector(".main-nav")
  document.body.insertBefore(container, nav.nextSibling)
}

function register() {
  if (document.querySelector(".loginModal")) {
    const container = document.querySelector(".loginModal")
    container.innerHTML = registerscreen
  }
}

function switchlogin() {
  if (document.querySelector(".loginModal")) {
    const container = document.querySelector(".loginModal")
    container.innerHTML = loginscreen
  }
}

perf("Loaded loginscreen.js", start)

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
      if (!data.user) location = "/"

      const name = pHolder.querySelector("p")
      const pImg = pHolder.querySelector("img")
      pImg.src = `/assets/getProfile.php?user=${data.u_id}`
      name.textContent = data.user

      pHolder.onclick = getDropdown
      login = true
    })
}
  
// Dropdown Options
function getDropdown() {

  if (document.querySelector(".dropdown")) {
    document.querySelector(".dropdown").classList.toggle("hidden")
    return
  }
  
  const dropdown = document.createElement("div")
  var options = [
    {
      name: "Go back to Main page",
      link: "/",
      icon: "mdi-basket-outline",
    },
    {
      name: "sep",
    },
    {
      name: "Profile",
      link: "/user.php",
      icon: "mdi-account-outline",
    },
    {
      name: "Logout",
      clickFn: () => {
        fetch("/api/loginHandler.php?logout=true")
            .then(setTimeout(_ => checkLogin(), 100))
      },
      icon: "mdi-logout-variant",
    },
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

    item.tabIndex = "3"

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


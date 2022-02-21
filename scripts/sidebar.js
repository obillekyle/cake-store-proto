function settings(key, value) {
  
  if (value === null || value === undefined) {
    const setting = localStorage.getItem(key)
    if (setting === null || undefined === setting) return null
    if (setting === 'true' || setting === 'false') 
    return JSON.parse(setting)
  }

  if (typeof value === "boolean") {
    value = value ? "true" : "false"
    console.log(value, "passes")
    localStorage.setItem(key, value)
    return value
  }
  localStorage.setItem(key, value)

}

if (!settings("sidebaropen")) {
  settings("sidebaropen", "false")
}

const sidebarelem = document.querySelector("#sidebar")

sidebarelem.classList.add("sidebar", !settings("sidebaropen")? "compact" : null)

document.body.addEventListener("click", e => {
  if (e.target.matches("[sidetoggle]")) {
    var isOpen = settings("sidebaropen")
    sidebarelem.classList.toggle("compact", isOpen)
    localStorage.setItem("sidebaropen", !isOpen)
  }
})

const sidebar = [
  {
    name: "Profile",
    icon: "mdi-account-outline",
    acon: "mdi-account",
    link: "/user.php"
  },
  {
    name: "Cart",
    icon: "mdi-cart-outline",
    acon: "mdi-cart",
    link: "/cart.php"
  },
  {
    name: "Orders",
    icon: "mdi-shopping-outline",
    acon: "mdi-shopping",
    link: "/orders.php"
  },
  {
    name: "Settings",
    icon: "mdi-cog-outline",
    acon: "mdi-cog",
    link: "/settings.php"
  }
]

sidebar.forEach((item, index) => {

  const msidebar = document.querySelector(".sidebar")

  const { name, link, icon, acon } = item

  const sideitem = document.createElement("div")
  const sidename = document.createElement("p")
  const sideicon = document.createElement("span")

  sidename.textContent = name
  sideicon.dataset.icon = icon

  sideitem.onclick = () => location = link;
  
  sideitem.tabIndex = "-1"
  sideitem.setAttribute("index", index + 1)
  sideitem.classList.add("sideitem")
  sideicon.classList.add("iconify")

  if (location.pathname === link) {
    sideitem.classList.add("active")
    sideicon.dataset.icon = acon
  }

  sideitem.append(sideicon, sidename)
  msidebar.append(sideitem)

})
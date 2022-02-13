function settings(key, value) {
  
  if (value === null || value === undefined) {
    const setting = localStorage.getItem(key);
    if (setting === null || undefined === setting) return null;
    if (setting === 'true' || setting === 'false') ;
    return JSON.parse(setting);
  }

  if (typeof value === "boolean") {
    value = value ? "true" : "false";
    console.log(value, "passes")
    localStorage.setItem(key, value);
    return value;
  }
  localStorage.setItem(key, value);

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
    name: "Dashboard",
    icon: "mdi-view-dashboard-outline",
    acon: "mdi-view-dashboard",
    link: "/admin/dashboard.php"
  },
  {
    name: "Manage Items",
    icon: "mdi-store-outline",
    acon: "mdi-store",
    link: "/admin/items.php"
  },
  {
    name: "Manage Users",
    icon: "mdi-account-multiple-outline",
    acon: "mdi-account-multiple",
    link: "/admin/users.php"
  },
  {
    name: "Site Settings",
    icon: "mdi-cog-outline",
    acon: "mdi-cog",
    link: "/admin/settings.php"
  }
]

sidebar.forEach(item => {

  const msidebar = document.querySelector(".sidebar");

  const { name, link, icon, acon } = item;

  const sideitem = document.createElement("div");
  const sidename = document.createElement("p");
  const sideicon = document.createElement("span");

  sidename.textContent = name;
  sideicon.dataset.icon = icon

  sideitem.onclick = () => {
    location = link
  }
  
  sideitem.tabIndex = "0";
  sideitem.classList.add("sideitem");
  sideicon.classList.add("iconify");

  if (location.pathname === link) {
    sideitem.classList.add("active");
    sideicon.dataset.icon = acon;
  }

  sideitem.append(sideicon, sidename);
  msidebar.append(sideitem)

})
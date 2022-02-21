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
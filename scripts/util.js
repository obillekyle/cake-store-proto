var start = performance.now();
function popup(message, level) {

  const popups = document.querySelector('#popups');
  const mPopup = document.createElement("div");
  const button = document.createElement("button");
  var   bColor = "gray"

  const remove = () => {
    mPopup.remove();
  }

  mPopup.textContent = message;
  button.textContent = "OK";
  button.setAttribute("special-button", "true");
  button.onclick = remove;
  mPopup.append(button);

  if (!message) throw new Error("Internal Error Occurred");
  if (!level || level === "info")  bColor = "gray";
  if (level === "warn")            bColor = "orange";
  if (level === "verbose")         bColor = "green";
  if (level === "error")           bColor = "red";

  mPopup.style.boxShadow = "-6px 0 0 " + bColor;
  popups.append(mPopup);

  mPopup.addEventListener("animationend", _ => {
    _?.target.remove();
  }) 
  
}

function random(min, max) {
  let random = (Math.trunc(Math.random() * max ?? 100))
  if (random < min) random = min;
  return random
}

function perf(label, number) {
  let color;
  const ms = (performance.now() - number).toFixed(2);
  if (ms < 10000) color = "black";
  if (ms < 1000)  color = "red";
  if (ms < 750)   color = "orangered";
  if (ms < 500)   color = "orange";
  if (ms < 300)   color = "yellow";
  if (ms < 100)   color = "lime";
  if (ms < 30)    color = "green";
  
  console.log(label + ": %c" + ms + "ms", "color: "+ color);
}

document.addEventListener("keyup", e => {
  if (e.target.disabled || e.target.dataset.disabled) return;
  if (e.key === "Enter" && e.target.matches(":focus")) {
    e.target.click();
    e.target.dataset.disabled = true;
    e.target.style.boxShadow = "0 0 0 2px var(--main-80)";
    setTimeout(_ => {
      delete e.target.dataset.disabled;
      e.target.style.boxShadow = "";
    },200)
  }

  if (e.target.matches("#password, #confpass")) {
    const pass = e.target.parentElement.querySelector("#password");
    const conf = e.target.parentElement.querySelector("#confpass");
    const bar = e.target.parentElement.querySelector("[bar=password]")
    const btn = e.target.parentElement.querySelector("[name=submit]")
    let width = 0;
    if ( pass.value.length > 6 )            width += 25
    if (/[a-z]/i.test(pass.value))          width += 25
    if (/[0-9]/.test(pass.value))           width += 25
    if (/[!@#\$%\^&\*]/.test(pass.value))   width += 25
    if ( pass.value.length < 6 )            width -= 25
    bar.style.width = width + "%";

    if (pass.value == conf.value) {
      pass.style.border = "1px solid var(--main-60)"
      conf.style.border = "1px solid var(--main-60)"
      console.log("True")
      if ( width > 50 ) {
        btn.disabled = false;
        delete btn.dataset.disabled;
        return;
      }
      btn.disabled = true;
      btn.dataset.disabled = true;
    }
    pass.style.border = "1px solid red"
    conf.style.border = "1px solid red"
  }
})


document.addEventListener("click", e => {
  if (e.target.matches(":focus:not(input)")) {
    e.target.dataset.disabled = true;
    e.target.style.boxShadow = "0 0 0 2px var(--main-80)";
    setTimeout(_ => {
      delete e.target.dataset.disabled;
      e.target.style.boxShadow = "";
    },200)
  };
})


document.addEventListener("submit", e => {

  // Login Handler
  if (e.target.matches("#login")) {
    e.preventDefault();
    const user = e.target.querySelector("#l-username");
    const pass = e.target.querySelector("#l-password");
    console.log(user.value, pass.value)
    const form = new FormData();

    form.append("method", "login")
    form.append("user", user.value)
    form.append("pass", pass.value)

    fetch("/api/loginHandler.php", {
      method: "POST",
      body: form
    })
    .then( res => res.json() )
    .then( data => {
      if (data.success) {
        popup(data.message, "verbose");
        checkLogin();
        return
      }
      popup(data.message, "warn");
    })
  }

  // Register Handler
  if (e.target.matches("#register")) {
    e.preventDefault();
    const user = e.target.querySelector("#username");
    const pass = e.target.querySelector("#password");
    const name = e.target.querySelector("#fullname");
    const conf = e.target.querySelector("#confpass");
    const mail = e.target.querySelector("#usermail");
    const form = new FormData();

    if (user.length > 16 || user.length < 3) {
      popup("Username must be 3 - 16 characters long", "error");
      return;
    }
    if (pass.length > pass.max || pass.length < pass.min ) {
      popup("Passwords must be 6 - 128 characters long", "error");
      return;
    }

    console.log(name.value)

    form.append("user", user.value)
    form.append("pass", pass.value)
    form.append("conf", conf.value)
    form.append("name", name.value)
    form.append("mail", mail.value)
    form.append("method", "register")

    fetch("/api/loginHandler.php", {
      method: "POST",
      body: form
    })
    .then( res => res.json() )
    .then( data => {
      if (data.success) {
        popup(data.message, "verbose");
        checkLogin();
        return
      }
      popup(data.message, "warn");
    })
  }
})
perf("Loaded util.js", start);
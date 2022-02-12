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
  if (e.target.disabled) return;
  if (e.key === "Enter" && e.target.matches(":focus") && !e.target.dataset.disabled) {
    e.target.click();
    e.target.dataset.disabled = true;
    e.target.style.boxShadow = "0 0 0 2px var(--main-80)";
    setTimeout(_ => {
      delete e.target.dataset.disabled;
      e.target.style.boxShadow = "";
    },200)
  }

  if (e.target.matches("#password")) {
    const value = e.target.value;
    const bar = e.target.parentElement.querySelector("[bar=password]")
    const btn = e.target.parentElement.querySelector("[name=submit]")
    let width = 0;
    if ( value.length > 6 )            width += 25
    if (/[a-z]/i.test(value))          width += 25
    if (/[0-9]/.test(value))           width += 25
    if (/[!@#\$%\^&\*]/.test(value)) width += 25
    if ( value.length < 6 )            width += 25
    bar.style.width = width + "%";

    if ( width < 50 ) {
      btn.disabled = true;
      btn.dataset.disabled = true;
    }
    if ( width > 50 ) {
      btn.disabled = false;
      delete btn.dataset.disabled;
    }
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
    const user = e.target.querySelector("#username");
    const pass = e.target.querySelector("#password");
    fetch("/api/loginHandler.php", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        method: "login", 
        user: user.value, 
        pass: pass.value
      })
    })
    .then( res => res.json())
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
  if (e.matches.target("#register")) {
    e.preventDefault();
    const user = e.target.querySelector("#username");
    const pass = e.target.querySelector("#password");
    const name = e.target.querySelector("#fullname");
    const conf = e.target.querySelector("#confpass");
    const mail = e.target.querySelector("#usermail");

    if (user.length > 16 || user.length < 3) {
      popup("Username must be 3 - 16 characters long", "error");
      return;
    }
    if (pass.length > pass.max || pass.length < pass.min || pass.value == conf.value) {
      popup("Passwords must be 3 - 16 characters long", "error");
      return;
    }

    fetch("/api/loginHandler.php", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        method: "register", 
        user: user.value,
        name: name.value,
        pass: pass.value,
        conf: conf.value,
        mail: mail.value
      })
    })
    .then( res => res.json())
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
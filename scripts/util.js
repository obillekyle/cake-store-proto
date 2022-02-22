Element.prototype.parentMatches = function(sel, deep) {
  if (!sel) return this.parentElement;
  if (deep < 1 || deep === true) deep = 10;

  const recursive = (elem, sel, num) => {
    if (!elem || num > deep) return undefined;
    if (elem.matches(sel)) return elem;
    return recursive(elem.parentElement, sel, num + 1);
  }
  return recursive(this.parentElement, sel, 0);
},

Element.prototype.animateValue = function(start, end, duration) {
  let startTimestamp = null;
  const step = timestamp => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    this.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) window.requestAnimationFrame(step);
  };
  window.requestAnimationFrame(step);
}


NodeList.prototype.toArray = function() {
  return [...this];
},

NodeList.prototype.remove = function() {
  for (let i = 0; i < this.length; i++) {
    this[i].remove();
  }
}


function popup(message, level) {
  const popups = document.querySelector('#popups')
  const mPopup = document.createElement("div")
  const button = document.createElement("button")
  var   bColor = "gray"

  const remove = () => {
    mPopup.remove()
  }

  mPopup.textContent = message
  button.textContent = "OK"
  button.setAttribute("special-button", "true")
  button.onclick = remove
  mPopup.append(button)

  if (!message) console.warn("Message is %cnull", "color: cyan");
  if (level === "info")     bColor = "gray"
  if (level === "warn")     bColor = "orange"
  if (level === "verbose")  bColor = "green"
  if (level === "error")    bColor = "red"

  mPopup.style.boxShadow = "-6px 0 0 " + bColor
  popups.append(mPopup)

  mPopup.addEventListener("animationend", _ => {
    _?.target.remove()
  }) 
}

function random(min, max) {
  let random = (Math.trunc(Math.random() * max ?? 100))
  if (random < min) random = min
  return random
}

function perf(label, number) {
  let color
  const ms = (performance.now() - number).toFixed(2)
  if (ms < 10000) color = "black"
  if (ms < 1000)  color = "red"
  if (ms < 750)   color = "orangered"
  if (ms < 500)   color = "orange"
  if (ms < 300)   color = "yellow"
  if (ms < 100)   color = "lime"
  if (ms < 30)    color = "green"
  
  console.log(label + ": %c" + ms + "ms", "color: "+ color)
}

function closeOverlay() {
  const overlay = document.querySelector("#overlay")
  overlay?.classList.add("hideOverlay")
}

// Events
// Keyboard events
document.addEventListener("keyup", e => {
  if (e.target.disabled || e.target.dataset.disabled) return
  if (e.key === "Enter" && e.target.matches(":focus")) {
    e.target.click()
    e.target.dataset.disabled = true
    e.target.style.boxShadow = "0 0 0 2px var(--main-80) inset"
    setTimeout(_ => {
      delete e.target.dataset.disabled
      e.target.style.boxShadow = ""
    },200)
  }

  if (e.target.matches("#password, #confpass")) {
    const pass = e.target.parentElement.querySelector("#password")
    const conf = e.target.parentElement.querySelector("#confpass")
    const bar = e.target.parentElement.querySelector("[bar=password]")
    const btn = e.target.parentElement.querySelector("[name=submit]")
    let width = 0
    if ( pass.value.length > 6 )            width += 25
    if (/[a-z]/i.test(pass.value))          width += 25
    if (/[0-9]/.test(pass.value))           width += 25
    if (/[!@#\$%\^&\*]/.test(pass.value))   width += 25
    if ( pass.value.length < 6 )            width -= 25
    bar.style.width = width + "%"

    if (pass.value == conf.value) {
      pass.style.border = "1px solid var(--main-60)"
      conf.style.border = "1px solid var(--main-60)"
      if ( width > 50 ) {
        btn.disabled = false
        delete btn.dataset.disabled
        return
      }
      btn.disabled = true
      btn.dataset.disabled = true
    }
    pass.style.border = "1px solid red"
    conf.style.border = "1px solid red"
  }
})

function outline(target) {
  target.dataset.disabled = true
  target.style.boxShadow = "0 0 0 2px var(--outline, var(--main-80)) inset"
  setTimeout(_ => {
    delete target.dataset.disabled
    target.style.boxShadow = ""
  },200)
}

// Click Events
document.addEventListener("click", e => {
  // Outline Events
  if (e.target.matches(":focus")) outline(e.target);
  if (e.target.matches(":focus *, [tabindex] *")) {
    if (e.target.matches(".checkbox *")) return;
    let target = e.target.parentMatches(":focus");
    if (!target || target.onclick) return;
    target.click();
    outline(target);
  }
  if (e.target.matches(".closeModal, .closeModal > *")) {
    closeOverlay();
  }
})

document.addEventListener("click", e => {
  if (e.target.matches(".sub, .add")) {
    if (e.target.disabled) return;
    const input = e.target.parentElement.querySelector("input")
    const value = e.target.matches(".sub") ? input.value - 1 : parseInt(input.value) + 1

    if (value < 1 || value > 100) {
      input.value = value < 1 ? 1 : 100;
      return;
    };
    input.value = value;

  }
})


// Form Submit
document.addEventListener("submit", e => {

  // Login Handler
  if (e.target.matches("#login")) {
    e.preventDefault()
    const user = e.target.querySelector("#l-username")
    const pass = e.target.querySelector("#l-password")
    const form = new FormData()

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
        popup(data.message, "verbose")
        checkLogin()
        return
      }
      popup(data.message, "warn")
    }).catch(err => {
      popup("An Error Occurred Login", "error")
    })
  }

  // Register Handler
  if (e.target.matches("#register")) {
    e.preventDefault()
    const user = e.target.querySelector("#username")
    const pass = e.target.querySelector("#password")
    const name = e.target.querySelector("#fullname")
    const conf = e.target.querySelector("#confpass")
    const mail = e.target.querySelector("#usermail")
    const form = new FormData()

    if (user.length > 16 || user.length < 3) {
      popup("Username must be 3 - 16 characters long", "error")
      return
    }
    if (pass.length > pass.max || pass.length < pass.min ) {
      popup("Passwords must be 6 - 128 characters long", "error")
      return
    }

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
        popup(data.message, "verbose")
        checkLogin()
        return
      }
      popup(data.message, "warn")
    }).catch(err => {
      popup("An Error Occurred - Register", "error")
    })
  }
})

// Keyboard Events
document.body.addEventListener("keyup", e => {
  if (e.target.matches("[index]")) {
    const index = parseInt(e.target.getAttribute("index"));
    if (e.key === "ArrowUp") {
      const elem = e.target.parentElement
                    .querySelector("[index='"+ (index - 1) +"']");
      if (!elem) return;
      e.preventDefault();
      elem.focus();
      return;
    }
    if (e.key === "ArrowDown") {
      const elem = e.target.parentElement
                    .querySelector("[index='"+ (index + 1) +"']");
      if (!elem) return;
      e.preventDefault();
      elem.focus();
      return;
    }
  }
  if (e.key == "Escape" && !document.querySelector(":focus")) closeOverlay();

})

// Transition Events
document.body.addEventListener("transitionend", e=> {
  if (e.target.matches(".hideOverlay")) {
    e.target.remove()
  }
})

document.body.addEventListener("change", e => {
  if (e.target.matches(".selAll > input")) {
    const checked = e.target.checked;
    document.querySelectorAll(".sel > input").forEach( input => {
      input.checked = checked;
    })
  }
})
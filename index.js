const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
const numbers = "0123456789".split("");
const symbols = "~`!@#$%^&*()-_+={[}]|:;<>.,?/".split("");

let passwordOneEL = document.getElementById("password-one");
let passwordTwoEL = document.getElementById("password-two");
let getPassword = document.getElementById("getPassword");
let errorMessage = document.getElementById("error-message");

function generatePassword() {

    let length = parseInt(document.getElementById("pw-length").value) || 15;

    // clear old error
    errorMessage.textContent = "";

    // check length validity
    if (length < 4 || length > 15) {
        errorMessage.textContent = "\u26A0\uFE0F Password must be between 4 and 15 characters.";
        return; // stop generation
    }

    let characters = [...letters];

    // add numbers if checked
    if (document.getElementById("include-numbers").checked) {
        characters = [...letters, ...numbers];
    }

    // add symbols if checked
    if (document.getElementById("include-symbols").checked) {
        characters = characters.concat(symbols);
    }

    // reset text
    passwordOneEL.textContent = "";
    passwordTwoEL.textContent = "";

    for (let i = 0; i < length; i++) {
        let randomIndexOne = Math.floor(Math.random() * characters.length);
        let randomIndexTwo = Math.floor(Math.random() * characters.length);

        passwordOneEL.textContent += characters[randomIndexOne];
        passwordTwoEL.textContent += characters[randomIndexTwo];
    }
}

// Generate when button clicked
getPassword.addEventListener("click", generatePassword);

// Copy-on-click
function copyPassword(event) {
    const text = event.target.textContent;
    if (text) {
        navigator.clipboard.writeText(text);
        alert("Password copied: " + text);
    }
}

passwordOneEL.addEventListener("click", copyPassword);
passwordTwoEL.addEventListener("click", copyPassword);

// Dark mode toggle v3.0 auto update with browser system and remember toggle switch
const toggle = document.getElementById("darkModeToggle");
const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

// Apply theme based on given mode
function setDarkMode(enabled, persist = false) {
  if (enabled) {
    document.body.classList.add("dark-mode");
    toggle.checked = true;
  } else {
    document.body.classList.remove("dark-mode");
    toggle.checked = false;
  }
  if (persist) {
    localStorage.setItem("theme", enabled ? "dark" : "light");
  }
}

// Load preference (localStorage first, then system)
const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  setDarkMode(savedTheme === "dark");
} else {
  setDarkMode(darkModeMediaQuery.matches);
}

// Toggle manually → persist choice
toggle.addEventListener("change", () => {
  setDarkMode(toggle.checked, true);
});

// System changes → update AND persist new state
darkModeMediaQuery.addEventListener("change", (e) => {
  setDarkMode(e.matches, true);
});
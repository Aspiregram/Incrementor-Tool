// Creating an event listener for maintaining the current count and theme
window.addEventListener("DOMContentLoaded", () => {
  let currentCount = localStorage.getItem("currentCount");
  let currentTheme = localStorage.getItem("currentTheme");

  if (currentCount) {
    counter = currentCount;
    counterDisplay.textContent = counter;
  }

  if (currentTheme) {
    colorOption.forEach((color) => {
      if (window.getComputedStyle(color).backgroundColor === currentTheme) {
        document.body.dataset.theme = color.id;
        switchTheme(color);
      }
    });
  }
});

// Getting the necessary DOM elements for the incrementor tool function
const counterDisplay = document.querySelector(".counter-display");
const counterButton = document.querySelectorAll(".counter-button");
const counterReset = document.getElementById("counter-reset");

let counter = 0; // Setting up a default value

// Creating an event listener for incrementing and decrementing the counter
counterButton.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.id === "counter-increment") {
      counterDisplay.textContent = ++counter;
    } else {
      counterDisplay.textContent = --counter;
    }

    localStorage.setItem("currentCount", counter);
  });
});

// Creating an event listener for resetting the counter
counterReset.addEventListener("click", () => {
  counter = 0;
  counterDisplay.textContent = counter;
  localStorage.setItem("currentCount", counter);
});

// Getting the necessary DOM elements for the settings function
const settingToggle = document.getElementById("settings-toggle");
const themePanel = document.querySelector(".theme-panel");
const colorOption = document.querySelectorAll(".color-option");

// Creating an event listener for toggling the panel
settingToggle.addEventListener("click", () => {
  if (themePanel.classList.contains("active")) {
    setTimeout(() => {
      themePanel.classList.remove("active");
    }, 1000);
    themePanel.style.animation = "close 1s 1";
    settingToggle.style.animation = "reversespin 1s 1";
  } else {
    themePanel.classList.add("active");
    themePanel.style.animation = "open 1s 1";
    settingToggle.style.animation = "spin 1s 1";
  }
});

// Creating an event listener for switching color schemes
colorOption.forEach((color) => {
  color.addEventListener("click", () => {
    document.body.dataset.theme = color.id;
    switchTheme(color);
  });
});

// Creating a function for handling theme switching
function switchTheme(themeButton) {
  let themeColor = window.getComputedStyle(themeButton).backgroundColor;

  counterDisplay.style.color = themeColor;
  counterButton.forEach((button) => {
    button.style.backgroundColor = themeColor;
  });

  localStorage.setItem("currentTheme", themeColor);
}

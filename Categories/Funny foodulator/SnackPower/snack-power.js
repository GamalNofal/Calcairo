function updateSnackPower() {
  const taste = parseFloat(document.getElementById("taste").value);
  const crunch = parseFloat(document.getElementById("crunch").value);
  const size = parseFloat(document.getElementById("size").value);

  // Sync number inputs
  document.getElementById("tasteInput").value = taste;
  document.getElementById("crunchInput").value = crunch;
  document.getElementById("sizeInput").value = size;

  // Snack Power Formula
  const power = (taste * crunch * size) / 10;
  document.getElementById("snackPower").innerHTML = `🍿 ${power.toFixed(1)} Power Units`;

  scrollToResult();
}

// Slider and number input sync
function setupSlider(sliderId, numberId, callback) {
  const slider = document.getElementById(sliderId);
  const number = document.getElementById(numberId);

  slider.addEventListener("input", () => {
    number.value = slider.value;
    callback();
  });

  number.addEventListener("input", () => {
    slider.value = number.value;
    callback();
  });
}

// Scroll to result card
let scrollTimeout;
function scrollToResult() {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    const result = document.getElementById("resultCard");
    result.classList.add("highlight");
    result.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => result.classList.remove("highlight"), 1600);
  }, 300);
}

document.addEventListener("DOMContentLoaded", function () {
  setupSlider("taste", "tasteInput", updateSnackPower);
  setupSlider("crunch", "crunchInput", updateSnackPower);
  setupSlider("size", "sizeInput", updateSnackPower);
  updateSnackPower();
});

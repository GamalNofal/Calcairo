function setupSlider(inputId, valueId, callback) {
  const slider = document.getElementById(inputId);
  const number = document.getElementById(valueId);

  slider.addEventListener("input", () => {
    number.value = slider.value;
    callback();
  });

  number.addEventListener("input", () => {
    slider.value = number.value;
    callback();
  });
}

function updatePregnancy() {
  const days = parseInt(document.getElementById("days").value);
  document.getElementById("daysInput").value = days;

  const weeks = (days / 7).toFixed(1);
  const remainingDays = 280 - days;

  document.getElementById("weeksPregnant").innerText = weeks;
  document.getElementById("daysRemaining").innerText = remainingDays;

  // Auto scroll and highlight results
  const resultCard = document.getElementById("resultCard");
  resultCard.classList.add("highlight-flash");
  setTimeout(() => {
    resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
    resultCard.classList.remove("highlight-flash");
  }, 150);
}

document.addEventListener("DOMContentLoaded", function () {
  setupSlider("days", "daysInput", updatePregnancy);
  updatePregnancy();
});

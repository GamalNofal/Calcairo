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

function updateHeartRate() {
  const age = parseInt(document.getElementById("age").value);
  document.getElementById("ageInput").value = age;

  const maxHR = 220 - age;
  const minTarget = Math.round(maxHR * 0.5);
  const maxTarget = Math.round(maxHR * 0.85);

  document.getElementById("maxRate").innerText = `${maxHR} bpm`;
  document.getElementById("targetZone").innerText = `${minTarget} – ${maxTarget} bpm`;

  const card = document.getElementById("resultCard");
  card.classList.add("highlight");
  setTimeout(() => {
    card.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => card.classList.remove("highlight"), 1000);
  }, 400);
}

document.addEventListener("DOMContentLoaded", function () {
  setupSlider("age", "ageInput", updateHeartRate);
  updateHeartRate();
});

function updateCalories() {
  const age = parseInt(document.getElementById("age").value);
  const weight = parseFloat(document.getElementById("weight").value);
  const height = parseFloat(document.getElementById("height").value);
  const gender = document.querySelector('input[name="gender"]:checked').value;
  const activity = parseFloat(document.getElementById("activity").value);

  document.getElementById("ageInput").value = age;
  document.getElementById("weightInput").value = weight;
  document.getElementById("heightInput").value = height;

  let bmr;
  if (gender === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  const tdee = Math.round(bmr * activity);

  document.getElementById("calorieValue").innerText = `${tdee.toLocaleString()} kcal/day`;
  document.getElementById("bmrValue").innerText = Math.round(bmr).toLocaleString();
  document.getElementById("calorieMessage").innerHTML = `
    <h3>Stay on Track!</h3>
    <p>Your estimated calorie need is based on your BMR and activity level. Use this number to maintain your weight, or adjust to reach your goals.</p>
    <p><strong>BMR:</strong> ${Math.round(bmr)} kcal/day</p>
  `;

  highlightResultCard();
}

// Delayed scroll and highlight
let scrollTimeout;
function highlightResultCard() {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    const resultCard = document.getElementById("resultCard");
    resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
    resultCard.classList.add("highlight");
    setTimeout(() => resultCard.classList.remove("highlight"), 1000);
  }, 400);
}

// Sync sliders & inputs
function setupSlider(inputId, valueId, onChange) {
  const slider = document.getElementById(inputId);
  const number = document.getElementById(valueId);
  slider.addEventListener("input", () => {
    number.value = slider.value;
    onChange();
  });
  number.addEventListener("input", () => {
    slider.value = number.value;
    onChange();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupSlider("age", "ageInput", updateCalories);
  setupSlider("weight", "weightInput", updateCalories);
  setupSlider("height", "heightInput", updateCalories);

  document.querySelectorAll('input[name="gender"]').forEach(radio =>
    radio.addEventListener("change", updateCalories)
  );
  document.getElementById("activity").addEventListener("change", updateCalories);

  updateCalories();
});

function updateDogFeeding() {
  const weight = parseFloat(document.getElementById("weight").value);
  const activity = parseInt(document.getElementById("activity").value);
  const costPerKg = parseFloat(document.getElementById("cost").value);

  document.getElementById("weightInput").value = weight;
  document.getElementById("activityInput").value = activity;

  const multiplier = activity === 1 ? 20 : activity === 2 ? 30 : 40;
  const dailyFoodGrams = weight * multiplier;

  const dailyFoodKg = dailyFoodGrams / 1000;
  const monthlyFoodCost = dailyFoodKg * costPerKg * 30;

  document.getElementById("foodAmount").textContent = dailyFoodGrams.toFixed(2) + " grams";
  document.getElementById("monthlyCost").textContent = "$" + monthlyFoodCost.toFixed(2);

  scrollToResultsOnceDone();
}

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

let scrollTimeout;

function scrollToResultsOnceDone() {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    const resultCard = document.querySelector(".result-card");
    resultCard.scrollIntoView({ behavior: "smooth", block: "start" });
    resultCard.classList.add("highlight");
    setTimeout(() => resultCard.classList.remove("highlight"), 1800);
  }, 1500);
}

document.addEventListener("DOMContentLoaded", function () {
  setupSlider("weight", "weightInput", updateDogFeeding);
  setupSlider("activity", "activityInput", updateDogFeeding);
  document.getElementById("cost").addEventListener("input", updateDogFeeding);

  updateDogFeeding();
});

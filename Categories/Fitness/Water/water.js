function calculateWaterIntake() {
  const unit = document.getElementById("unitSystem").dataset.unit;
  const weight = parseFloat(document.getElementById("weight").value);
  const activity = document.getElementById("activity").value;
  const climate = document.getElementById("climate").value;

  if (isNaN(weight) || weight <= 0) {
    showResult("Please enter a valid weight.");
    return;
  }

  // Convert weight to kg if in imperial
  const weightInKg = unit === "metric" ? weight : weight * 0.453592;

  // Base intake: 35 ml per kg
  let baseMl = weightInKg * 35;

  // Add extra for activity level
  let activityBoost = 0;
  switch (activity) {
    case "low": activityBoost = 0; break;
    case "medium": activityBoost = 300; break;
    case "high": activityBoost = 500; break;
  }

  // Add extra for climate
  let climateBoost = 0;
  switch (climate) {
    case "moderate": climateBoost = 0; break;
    case "hot": climateBoost = 300; break;
    case "cold": climateBoost = 150; break;
    case "humid": climateBoost = 250; break;
    case "tropical": climateBoost = 350; break;
    case "dry": climateBoost = 200; break;
  }

  const totalMl = baseMl + activityBoost + climateBoost;
  const totalLiters = (totalMl / 1000).toFixed(2);
  const totalOz = (totalMl * 0.033814).toFixed(2);

  const resultText =
    unit === "metric"
      ? `You should drink approximately <strong>${totalLiters} liters</strong> of water daily.`
      : `You should drink approximately <strong>${totalOz} oz</strong> of water daily.`;

  showResult(resultText);
  scrollToResult();
}

function showResult(message) {
  const result = document.getElementById("waterResult");
  result.innerHTML = message;
}

function switchUnit(toMetric) {
  const unitSystem = document.getElementById("unitSystem");
  unitSystem.dataset.unit = toMetric ? "metric" : "imperial";

  // Update input placeholder
  document.getElementById("weight").placeholder = toMetric ? "kg" : "lbs";

  // Update active button styles
  const btns = document.querySelectorAll(".unit-btn");
  btns.forEach(btn => btn.classList.remove("active"));
  btns[toMetric ? 0 : 1].classList.add("active");
}

function scrollToResult() {
  const resultCard = document.getElementById("resultCard");
  resultCard.classList.add("highlight");
  resultCard.scrollIntoView({ behavior: "smooth", block: "center" });

  setTimeout(() => resultCard.classList.remove("highlight"), 2000);
}

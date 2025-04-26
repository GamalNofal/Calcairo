function calculateTDEE() {
  const gender = document.getElementById("gender").value;
  const age = parseFloat(document.getElementById("age").value);
  let weight = parseFloat(document.getElementById("weight").value);
  let height = parseFloat(document.getElementById("height").value);
  const activity = parseFloat(document.getElementById("activity").value);
  const isMetric = document.getElementById("unitSystem").dataset.unit === "metric";

  // Convert units if necessary
  if (!isMetric) {
    weight = weight * 0.453592; // lbs to kg
    height = height * 2.54;     // inches to cm
  }

  let bmr = 0;
  if (gender === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  const tdee = Math.round(bmr * activity);

  const result = document.getElementById("tdeeResult");
  result.innerHTML = `Estimated Total Daily Energy Expenditure: <strong>${tdee.toLocaleString()} kcal/day</strong>`;

  scrollToResult();
}

function scrollToResult() {
  const card = document.getElementById("resultCard");
  card.classList.add("highlight");
  card.scrollIntoView({ behavior: "smooth", block: "center" });
  setTimeout(() => card.classList.remove("highlight"), 2000);
}

function switchUnit(isMetric) {
  const unitSystem = document.getElementById("unitSystem");
  unitSystem.dataset.unit = isMetric ? "metric" : "us";

  document.getElementById("weight").placeholder = isMetric ? "kg" : "lbs";
  document.getElementById("height").placeholder = isMetric ? "cm" : "in";
}

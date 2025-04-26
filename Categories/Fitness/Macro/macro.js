function calculateMacros() {
    const gender = document.getElementById("gender").value;
    const age = parseInt(document.getElementById("age").value);
    let weight = parseFloat(document.getElementById("weight").value);
    let height = parseFloat(document.getElementById("height").value);
    const activity = parseFloat(document.getElementById("activity").value);
    const unit = document.getElementById("unitSystem").dataset.unit;
  
    // Convert if US units
    if (unit === "us") {
      weight = weight * 0.453592;
      height = height * 2.54;
    }
  
    let bmr = 0;
    if (gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
  
    const tdee = bmr * activity;
  
    const protein = (weight * 2.2).toFixed(0); // ~1g/lb
    const fat = (weight * 0.4).toFixed(0);     // ~0.4g/lb
    const fatCals = fat * 9;
    const proteinCals = protein * 4;
    const carbs = Math.round((tdee - fatCals - proteinCals) / 4);
  
    document.getElementById("macroResult").innerHTML = `
      <p><strong>Total Daily Calories:</strong> ${Math.round(tdee)} kcal</p>
      <p><strong>Protein:</strong> ${protein}g</p>
      <p><strong>Fats:</strong> ${fat}g</p>
      <p><strong>Carbs:</strong> ${carbs}g</p>
    `;
  
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
  
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("unitSystem").dataset.unit = "metric";
  });
  
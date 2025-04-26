document.addEventListener("DOMContentLoaded", () => {
    const weightInput = document.getElementById("weight");
    const activityInput = document.getElementById("activity");
    const calculateBtn = document.getElementById("calculateBtn");
    const resultBox = document.getElementById("resultBox");
    const resultCard = document.getElementById("resultCard");
  
    calculateBtn.addEventListener("click", () => {
      const weight = parseFloat(weightInput.value);
      const activity = activityInput.value;
  
      if (isNaN(weight) || weight < 30 || weight > 200) {
        resultBox.innerHTML = "<p>Please enter a valid weight between 30–200 kg.</p>";
        return;
      }
  
      let multiplier;
      switch (activity) {
        case "low":
          multiplier = 30; // mL per kg
          break;
        case "moderate":
          multiplier = 35;
          break;
        case "high":
          multiplier = 40;
          break;
      }
  
      const mlPerDay = weight * multiplier;
      const liters = mlPerDay / 1000;
      const cups = mlPerDay / 240;
  
      resultBox.innerHTML = `
        <p><strong>Recommended Intake:</strong></p>
        <p>${liters.toFixed(2)} liters / ${cups.toFixed(1)} cups per day</p>
        <p style="margin-top: 1rem; font-size: 0.9rem; color: #555;">
          💧 Based on general hydration guidelines. Consult a doctor for medical-specific needs.
        </p>
      `;
  
      scrollToResult();
    });
  
    function scrollToResult() {
      resultCard.classList.add("highlight");
      resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => resultCard.classList.remove("highlight"), 2000);
    }
  });
  
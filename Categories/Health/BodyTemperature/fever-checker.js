document.addEventListener("DOMContentLoaded", () => {
    const tempInput = document.getElementById("temperature");
    const unitSelect = document.getElementById("unit");
    const resultBox = document.getElementById("resultBox");
    const resultCard = document.getElementById("resultCard");
    const checkBtn = document.getElementById("checkBtn");
  
    checkBtn.addEventListener("click", () => {
      const temp = parseFloat(tempInput.value);
      const unit = unitSelect.value;
  
      if (isNaN(temp)) {
        resultBox.innerHTML = "<p>Please enter a valid temperature.</p>";
        return;
      }
  
      let celsius = unit === "F" ? (temp - 32) * (5 / 9) : temp;
      let category = "";
      let emoji = "";
  
      if (celsius < 35.0) {
        category = "Hypothermia";
        emoji = "❄️";
      } else if (celsius >= 35 && celsius < 37.5) {
        category = "Normal Temperature";
        emoji = "✅";
      } else if (celsius >= 37.5 && celsius < 38.3) {
        category = "Low-Grade Fever";
        emoji = "🌡️";
      } else if (celsius >= 38.3 && celsius < 39.5) {
        category = "Moderate Fever";
        emoji = "🤒";
      } else if (celsius >= 39.5 && celsius <= 41) {
        category = "High Fever";
        emoji = "🔥";
      } else {
        category = "Critical Temperature";
        emoji = "🚨";
      }
  
      const fahrenheit = (celsius * 9) / 5 + 32;
  
      resultBox.innerHTML = `
        <p style="font-size: 2rem;">${emoji}</p>
        <p><strong>${category}</strong></p>
        <p>${celsius.toFixed(1)} °C / ${fahrenheit.toFixed(1)} °F</p>
        <p style="margin-top: 1rem; font-size: 0.9rem; color: #555;">
          ⚠️ This tool is for educational purposes only. Always consult a healthcare provider for medical concerns.
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
  
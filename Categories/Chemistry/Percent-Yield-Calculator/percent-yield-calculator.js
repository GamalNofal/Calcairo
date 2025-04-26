// percent-yield-calculator.js

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("yieldForm");
    const resultCard = document.getElementById("resultCard");
    const resultBox = document.getElementById("yieldResult");
    const tryAgainBtn = document.getElementById("tryAgain");
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const actualYield = parseFloat(document.getElementById("actualYield").value);
      const theoreticalYield = parseFloat(document.getElementById("theoreticalYield").value);
  
      if (
        isNaN(actualYield) || actualYield <= 0 ||
        isNaN(theoreticalYield) || theoreticalYield <= 0
      ) {
        resultBox.innerHTML = "<p>❌ Please enter valid positive numbers!</p>";
        resultCard.style.display = "block";
        return;
      }
  
      if (actualYield > theoreticalYield) {
        resultBox.innerHTML = "<p>⚠️ Actual yield cannot be greater than theoretical yield!</p>";
        resultCard.style.display = "block";
        return;
      }
  
      const percentYield = (actualYield / theoreticalYield) * 100;
      const message = interpretYield(percentYield);
  
      resultBox.innerHTML = `<p>Percent Yield = <strong>${percentYield.toFixed(2)}%</strong><br>${message}</p>`;
      resultCard.style.display = "block";
      highlightResult();
    });
  
    tryAgainBtn.addEventListener("click", () => {
      form.reset();
      resultCard.style.display = "none";
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  
    function highlightResult() {
      resultCard.classList.add("glow");
      resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => {
        resultCard.classList.remove("glow");
      }, 2000);
    }
  
    function interpretYield(percent) {
      if (percent >= 90) return "🎯 Excellent yield!";
      if (percent >= 70) return "👍 Good yield!";
      return "🛠️ Could be improved!";
    }
  });
  
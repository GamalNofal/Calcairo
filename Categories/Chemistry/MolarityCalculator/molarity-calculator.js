// molarity-calculator.js

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("molarityForm");
    const resultCard = document.getElementById("resultCard");
    const resultBox = document.getElementById("molarityResult");
    const tryAgainBtn = document.getElementById("tryAgain");
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const mass = parseFloat(document.getElementById("mass").value);
      const molarMass = parseFloat(document.getElementById("molarMass").value);
      const volume = parseFloat(document.getElementById("volume").value);
  
      if (
        isNaN(mass) || mass <= 0 ||
        isNaN(molarMass) || molarMass <= 0 ||
        isNaN(volume) || volume <= 0
      ) {
        resultBox.innerHTML = "<p>❌ Please enter valid positive numbers!</p>";
        resultCard.style.display = "block";
        return;
      }
  
      const molarity = (mass / molarMass) / volume;
  
      resultBox.innerHTML = `<p>Molarity = <strong>${molarity.toFixed(4)} mol/L</strong></p>`;
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
  });
  
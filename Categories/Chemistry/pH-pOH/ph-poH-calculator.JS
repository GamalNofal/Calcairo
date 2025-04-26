// ph-poH-calculator.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("phForm");
  const calcType = document.getElementById("calcType");
  const concentrationInput = document.getElementById("concentration");
  const resultCard = document.getElementById("resultCard");
  const resultBox = document.getElementById("phResult");
  const tryAgainBtn = document.getElementById("tryAgain");

  // Update placeholder text and background based on selection
  calcType.addEventListener("change", () => {
    concentrationInput.classList.remove("ph-mode", "poh-mode");

    if (calcType.value === "ph") {
      concentrationInput.placeholder = "Enter [H⁺] concentration (mol/L)";
      concentrationInput.classList.add("ph-mode");
    } else if (calcType.value === "poh") {
      concentrationInput.placeholder = "Enter [OH⁻] concentration (mol/L)";
      concentrationInput.classList.add("poh-mode");
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const concentration = parseFloat(concentrationInput.value);

    if (isNaN(concentration) || concentration <= 0) {
      resultBox.innerHTML = "<p>❌ Please enter a valid positive concentration!</p>";
      resultCard.style.display = "block";
      return;
    }

    let pH = 0;
    let message = "";

    if (calcType.value === "ph") {
      pH = -Math.log10(concentration);
      message = `pH = <strong>${pH.toFixed(2)}</strong><br>${interpretSolution(pH)}`;
    } else if (calcType.value === "poh") {
      const pOH = -Math.log10(concentration);
      pH = 14 - pOH;
      message = `pOH = <strong>${pOH.toFixed(2)}</strong><br>pH = <strong>${pH.toFixed(2)}</strong><br>${interpretSolution(pH)}`;
    } else {
      message = "⚠️ Invalid calculation type selected.";
    }

    resultBox.innerHTML = `<p>${message}</p>`;
    resultCard.style.display = "block";
    highlightResult();
  });

  tryAgainBtn.addEventListener("click", () => {
    form.reset();
    resultCard.style.display = "none";
    concentrationInput.placeholder = "Enter Concentration (mol/L)";
    concentrationInput.classList.remove("ph-mode", "poh-mode");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  function highlightResult() {
    resultCard.classList.add("glow");
    resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => {
      resultCard.classList.remove("glow");
    }, 2000);
  }

  function interpretSolution(pH) {
    if (pH < 7) return "🧪 The solution is <strong>Acidic</strong>!";
    if (pH === 7) return "⚖️ The solution is <strong>Neutral</strong>.";
    if (pH > 7) return "🧪 The solution is <strong>Basic</strong>!";
    return "";
  }
});

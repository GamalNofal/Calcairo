// percentage-calculator.js

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("percentageForm");
    const calcType = document.getElementById("calcType");
    const input1 = document.getElementById("input1");
    const input2 = document.getElementById("input2");
    const resultCard = document.getElementById("resultCard");
    const resultBox = document.getElementById("percentageResult");
    const tryAgainBtn = document.getElementById("tryAgain");
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const val1 = parseFloat(input1.value);
      const val2 = parseFloat(input2.value);
  
      if (isNaN(val1) || isNaN(val2) || val2 === 0) {
        resultBox.innerHTML = "<p>❌ Please enter valid numbers (second value cannot be zero)!</p>";
        resultCard.style.display = "block";
        return;
      }
  
      let result = 0;
      let message = "";
  
      switch (calcType.value) {
        case "findValue":
          result = (val1 / 100) * val2;
          message = `${val1}% of ${val2} is <strong>${result.toFixed(2)}</strong>`;
          break;
  
        case "findPercent":
          result = (val1 / val2) * 100;
          message = `${val1} is <strong>${result.toFixed(2)}%</strong> of ${val2}`;
          break;
  
        case "percentChange":
          result = ((val2 - val1) / val1) * 100;
          if (result > 0) {
            message = `An <strong>increase of ${result.toFixed(2)}%</strong> from ${val1} to ${val2}`;
          } else if (result < 0) {
            message = `A <strong>decrease of ${Math.abs(result).toFixed(2)}%</strong> from ${val1} to ${val2}`;
          } else {
            message = `No change between ${val1} and ${val2}`;
          }
          break;
  
        default:
          message = "⚠️ Invalid calculation type selected.";
      }
  
      resultBox.innerHTML = `<p>${message}</p>`;
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
  
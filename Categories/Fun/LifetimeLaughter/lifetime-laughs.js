// lifetime-laughs.js

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("laughForm");
    const resultCard = document.getElementById("resultCard");
    const laughResult = document.getElementById("laughResult");
    const tryAgainBtn = document.getElementById("tryAgain");
  
    const averageLifespanYears = 78; // Average life expectancy
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const laughsPerDay = parseFloat(document.getElementById("laughsPerDay").value);
  
      if (isNaN(laughsPerDay) || laughsPerDay <= 0) {
        laughResult.innerHTML = "<p>❌ Please enter a valid positive number!</p>";
        resultCard.style.display = "block";
        return;
      }
  
      const lifetimeLaughs = Math.round(laughsPerDay * 365 * averageLifespanYears);
  
      laughResult.innerHTML = `
        <p><strong>You will laugh approximately:</strong></p>
        <p style="font-size:1.6rem;margin-top:8px;">${lifetimeLaughs.toLocaleString()} times 😆</p>
        <p style="margin-top:1rem;">That's a lifetime full of joy!</p>
      `;
  
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
  
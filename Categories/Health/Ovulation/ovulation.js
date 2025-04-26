document.addEventListener("DOMContentLoaded", () => {
    const periodStart = document.getElementById("periodStart");
    const cycleLength = document.getElementById("cycleLength");
    const calculateBtn = document.getElementById("calculateBtn");
    const resultBox = document.getElementById("resultBox");
    const resultCard = document.getElementById("resultCard");
  
    calculateBtn.addEventListener("click", () => {
      const startDate = new Date(periodStart.value);
      const cycle = parseInt(cycleLength.value);
  
      if (!periodStart.value || isNaN(cycle) || cycle < 20 || cycle > 40) {
        resultBox.innerHTML = "<p>Please enter a valid period start date and cycle length (20–40 days).</p>";
        return;
      }
  
      const ovulationDay = new Date(startDate);
      ovulationDay.setDate(ovulationDay.getDate() + (cycle - 14)); // Ovulation ≈ 14 days before next period
  
      const fertileStart = new Date(ovulationDay);
      fertileStart.setDate(fertileStart.getDate() - 5);
  
      const fertileEnd = new Date(ovulationDay);
      fertileEnd.setDate(fertileEnd.getDate() + 1);
  
      const options = { year: "numeric", month: "long", day: "numeric" };
  
      resultBox.innerHTML = `
        <p><strong>Estimated Ovulation:</strong><br> ${ovulationDay.toLocaleDateString(undefined, options)}</p>
        <p><strong>Fertile Window:</strong><br> ${fertileStart.toLocaleDateString(undefined, options)} 
           – ${fertileEnd.toLocaleDateString(undefined, options)}</p>
        <p style="margin-top: 1rem; font-size: 0.9rem; color: #555;">
          ⚠️ This is an estimate. Always consult a healthcare provider for personalized advice.
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
  
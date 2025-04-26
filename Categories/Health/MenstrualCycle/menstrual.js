document.addEventListener("DOMContentLoaded", () => {
    const lastPeriodInput = document.getElementById("lastPeriod");
    const cycleLengthInput = document.getElementById("cycleLength");
    const calculateBtn = document.getElementById("calculateBtn");
    const resultBox = document.getElementById("resultBox");
    const resultCard = document.getElementById("resultCard");
  
    calculateBtn.addEventListener("click", () => {
      const lastPeriod = new Date(lastPeriodInput.value);
      const cycleLength = parseInt(cycleLengthInput.value);
  
      if (!lastPeriodInput.value || isNaN(cycleLength) || cycleLength < 21 || cycleLength > 40) {
        resultBox.innerHTML = "<p>Please enter a valid last period date and cycle length (21–40 days).</p>";
        return;
      }
  
      // Calculate next period and ovulation
      const nextPeriod = new Date(lastPeriod);
      nextPeriod.setDate(nextPeriod.getDate() + cycleLength);
  
      const ovulationDay = new Date(nextPeriod);
      ovulationDay.setDate(ovulationDay.getDate() - 14);
  
      // Today’s cycle day
      const today = new Date();
      const cycleDay = Math.floor((today - lastPeriod) / (1000 * 60 * 60 * 24)) + 1;
  
      const options = { year: "numeric", month: "long", day: "numeric" };
  
      resultBox.innerHTML = `
        <p><strong>Next Period:</strong><br>${nextPeriod.toLocaleDateString(undefined, options)}</p>
        <p><strong>Estimated Ovulation:</strong><br>${ovulationDay.toLocaleDateString(undefined, options)}</p>
        <p><strong>Current Cycle Day:</strong> ${cycleDay}</p>
        <p style="margin-top: 1rem; font-size: 0.9rem; color: #555;">
          📅 This tracker provides estimated predictions. Always consult a healthcare provider for concerns.
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
  
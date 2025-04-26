document.addEventListener("DOMContentLoaded", () => {
    const currentAge = document.getElementById("currentAge");
    const retirementAge = document.getElementById("retirementAge");
    const goalAmount = document.getElementById("goalAmount");
    const currentSavings = document.getElementById("currentSavings");
    const monthlyContribution = document.getElementById("monthlyContribution");
    const returnRate = document.getElementById("returnRate");
    const resultBox = document.getElementById("resultBox");
    const resultCard = document.getElementById("resultCard");
    const calculateBtn = document.getElementById("calculateBtn");
  
    calculateBtn.addEventListener("click", () => {
      const ageNow = parseInt(currentAge.value);
      const ageRetire = parseInt(retirementAge.value);
      const goal = parseFloat(goalAmount.value);
      const current = parseFloat(currentSavings.value);
      const monthly = parseFloat(monthlyContribution.value);
      const annualReturn = parseFloat(returnRate.value) / 100;
  
      const yearsToGrow = ageRetire - ageNow;
      if (isNaN(ageNow) || isNaN(ageRetire) || yearsToGrow <= 0 || isNaN(goal) || isNaN(current) || isNaN(monthly) || isNaN(annualReturn)) {
        resultBox.innerHTML = `<p>Please enter valid values in all fields.</p>`;
        return;
      }
  
      // Compound interest formula: FV = P*(1 + r)^n + PMT * [((1 + r)^n - 1) / r]
      const months = yearsToGrow * 12;
      const monthlyRate = annualReturn / 12;
  
      const futureFromCurrent = current * Math.pow(1 + monthlyRate, months);
      const futureFromContrib = monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
      const totalFuture = futureFromCurrent + futureFromContrib;
  
      const gap = goal - totalFuture;
      const gapText = gap > 0
        ? `<p><strong>⚠️ You will be short by:</strong> $${gap.toFixed(2)}</p>`
        : `<p><strong>✅ You’re on track!</strong> You will exceed your goal by $${Math.abs(gap).toFixed(2)}</p>`;
  
      const extraNeeded = gap > 0 ? (gap / months) : 0;
      const message = gap > 0
        ? `You’d need to save an extra ~$${extraNeeded.toFixed(2)} per month to close the gap.`
        : "Nice job staying ahead of your goal! 💪";
  
      resultBox.innerHTML = `
        <p><strong>Years Until Retirement:</strong> ${yearsToGrow} years</p>
        <p><strong>Estimated Future Savings:</strong> $${totalFuture.toFixed(2)}</p>
        ${gapText}
        <p>${message}</p>
      `;
  
      scrollToResult();
    });
  
    function scrollToResult() {
      resultCard.classList.add("highlight");
      resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => resultCard.classList.remove("highlight"), 2000);
    }
  });
  
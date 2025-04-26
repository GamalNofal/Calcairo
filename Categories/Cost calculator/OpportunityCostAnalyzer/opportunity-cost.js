document.addEventListener("DOMContentLoaded", () => {
    const costAInput = document.getElementById("costA");
    const rateInput = document.getElementById("rate");
    const yearsInput = document.getElementById("years");
    const choiceAInput = document.getElementById("choiceA");
    const choiceBInput = document.getElementById("choiceB");
    const resultBox = document.getElementById("resultBox");
    const resultCard = document.getElementById("resultCard");
    const calculateBtn = document.getElementById("calculateBtn");
  
    calculateBtn.addEventListener("click", () => {
      const cost = parseFloat(costAInput.value);
      const rate = parseFloat(rateInput.value);
      const years = parseInt(yearsInput.value);
      const choiceA = choiceAInput.value.trim() || "Choice A";
      const choiceB = choiceBInput.value.trim() || "Alternative";
  
      if (isNaN(cost) || isNaN(rate) || isNaN(years) || cost <= 0 || rate < 0 || years <= 0) {
        resultBox.innerHTML = "<p>Please enter valid numbers for cost, rate, and years.</p>";
        return;
      }
  
      // Compound interest formula: FV = P * (1 + r)^t
      const growthRate = rate / 100;
      const futureValue = cost * Math.pow(1 + growthRate, years);
      const opportunityCost = futureValue - cost;
  
      const wisdom = [
        "Every dollar spent is a vote for your future… or your cravings.",
        "Small choices, big consequences — time makes it expensive.",
        "Sometimes 'treating yourself' costs your future self a vacation.",
        "You traded passive gains for instant pleasure — classic move.",
        "Long-term value often hides behind short-term temptation."
      ];
      const tip = wisdom[Math.floor(Math.random() * wisdom.length)];
  
      resultBox.innerHTML = `
        <p>You spent <strong>$${cost.toFixed(2)}</strong> on <em>${choiceA}</em>.</p>
        <p>If you'd chosen <strong>${choiceB}</strong> and earned ${rate}% annually for ${years} years,</p>
        <p><strong>You could have had: $${futureValue.toFixed(2)}</strong></p>
        <p><strong>Lost Gains (Opportunity Cost): $${opportunityCost.toFixed(2)}</strong></p>
        <p style="margin-top: 1rem; font-size: 0.9rem; color: #555;">💡 ${tip}</p>
      `;
  
      scrollToResult();
    });
  
    function scrollToResult() {
      resultCard.classList.add("highlight");
      resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => resultCard.classList.remove("highlight"), 2000);
    }
  });
  
function calculateRetirement() {
  const currentAge = parseInt(document.getElementById("currentAge").value);
  const retirementAge = parseInt(document.getElementById("retirementAge").value);
  const currentSavings = parseFloat(document.getElementById("currentSavings").value);
  const monthlySavings = parseFloat(document.getElementById("monthlySavings").value);
  const annualReturn = parseFloat(document.getElementById("returnRate").value) / 100;

  const resultBox = document.getElementById("retirementResult");
  const resultCard = document.getElementById("resultCard");

  if (
    isNaN(currentAge) || isNaN(retirementAge) || isNaN(currentSavings) ||
    isNaN(monthlySavings) || isNaN(annualReturn)
  ) {
    resultBox.innerHTML = `<p>Please fill in all fields correctly.</p>`;
    return;
  }

  const years = retirementAge - currentAge;
  const months = years * 12;
  const monthlyRate = annualReturn / 12;

  // Compound existing savings
  let futureValue = currentSavings * Math.pow(1 + monthlyRate, months);

  // Future value of monthly contributions
  futureValue += monthlySavings * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

  resultBox.innerHTML = `
    <p><strong>Years until retirement:</strong> ${years}</p>
    <p><strong>Estimated savings by ${retirementAge}:</strong> $${futureValue.toFixed(2)}</p>
    <p class="bmi-label">This estimate assumes constant contributions and compounding monthly at an average return of ${(annualReturn * 100).toFixed(1)}% annually.</p>
  `;

  scrollToResult();
}

function scrollToResult() {
  const resultCard = document.getElementById("resultCard");
  resultCard.classList.add("highlight");
  resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
  setTimeout(() => resultCard.classList.remove("highlight"), 2000);
}

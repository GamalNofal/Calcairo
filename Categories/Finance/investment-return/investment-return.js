function calculateInvestment() {
  const initial = parseFloat(document.getElementById("initial").value);
  const monthly = parseFloat(document.getElementById("monthly").value);
  const rate = parseFloat(document.getElementById("rate").value) / 100;
  const years = parseFloat(document.getElementById("years").value);
  const freq = parseInt(document.getElementById("frequency").value);

  const resultCard = document.getElementById("resultCard");
  const resultBox = document.getElementById("investmentResult");

  if (isNaN(initial) || isNaN(monthly) || isNaN(rate) || isNaN(years) || isNaN(freq)) {
    resultBox.innerHTML = `<p>Please fill in all fields correctly.</p>`;
    return;
  }

  let total = initial;
  const months = years * 12;
  const compoundTimes = freq * years;
  const rPerPeriod = rate / freq;

  // Compound interest on initial + regular monthly contributions
  for (let i = 1; i <= compoundTimes; i++) {
    total *= (1 + rPerPeriod);
    total += (monthly * 12 / freq);
  }

  const totalContributions = initial + (monthly * 12 * years);
  const interest = total - totalContributions;

  resultBox.innerHTML = `
    <p><strong>Total Value:</strong> $${total.toFixed(2)}</p>
    <p><strong>Total Contributions:</strong> $${totalContributions.toFixed(2)}</p>
    <p><strong>Interest Earned:</strong> $${interest.toFixed(2)}</p>
  `;

  resultCard.classList.add("highlight");
  setTimeout(() => resultCard.classList.remove("highlight"), 2000);
  resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
}

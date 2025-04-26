function calculateSavings() {
  const initial = parseFloat(document.getElementById("initial").value) || 0;
  const annual = parseFloat(document.getElementById("annual").value) || 0;
  const annualIncrease = parseFloat(document.getElementById("annualIncrease").value) || 0;
  const monthly = parseFloat(document.getElementById("monthly").value) || 0;
  const monthlyIncrease = parseFloat(document.getElementById("monthlyIncrease").value) || 0;
  const rate = parseFloat(document.getElementById("interest").value) || 0;
  const compound = parseInt(document.getElementById("compound").value);
  const years = parseInt(document.getElementById("years").value) || 0;
  const taxRate = parseFloat(document.getElementById("tax").value) || 0;

  const resultBox = document.getElementById("result");

  if (years <= 0 || rate < 0) {
    resultBox.innerHTML = `<p>Please enter valid interest rate and time period.</p>`;
    return;
  }

  let balance = initial;
  const months = years * 12;
  let annualContribution = annual;
  let monthlyContribution = monthly;

  for (let i = 0; i < months; i++) {
    const currentRate = rate / 100 / 12;
    balance += monthlyContribution;
    balance *= 1 + currentRate;

    // At the end of every 12 months, add annual contribution
    if ((i + 1) % 12 === 0) {
      balance += annualContribution;
      annualContribution *= 1 + (annualIncrease / 100);
    }

    monthlyContribution *= 1 + (monthlyIncrease / 100 / 12);
  }

  const tax = (balance - initial) * (taxRate / 100);
  const afterTax = balance - tax;

  resultBox.innerHTML = `
    <p><strong>Final Balance:</strong> $${balance.toFixed(2)}</p>
    <p><strong>Estimated Tax:</strong> $${tax.toFixed(2)}</p>
    <p><strong>After-Tax Total:</strong> $${afterTax.toFixed(2)}</p>
    <p><small>Includes growth from compound interest and your contributions over ${years} years.</small></p>
  `;

  scrollToResult();
}

function scrollToResult() {
  const resultCard = document.getElementById("resultCard");
  resultCard.classList.add("highlight");
  resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
  setTimeout(() => resultCard.classList.remove("highlight"), 2000);
}

function calculatePayoff() {
  const balance = parseFloat(document.getElementById("balance").value);
  const rate = parseFloat(document.getElementById("rate").value);
  const payment = parseFloat(document.getElementById("payment").value);
  const resultBox = document.getElementById("payoffResult");

  if (isNaN(balance) || isNaN(rate) || isNaN(payment) || balance <= 0 || payment <= 0 || rate < 0) {
    resultBox.innerHTML = "<p>Please enter valid numbers for all fields.</p>";
    return;
  }

  const monthlyRate = rate / 100 / 12;
  let months = 0;
  let totalInterest = 0;
  let remaining = balance;

  // Prevent infinite loop if payment is too low
  if (payment <= balance * monthlyRate) {
    resultBox.innerHTML = "<p>Your monthly payment is too low to cover the interest. Please enter a higher amount.</p>";
    return;
  }

  while (remaining > 0) {
    const interest = remaining * monthlyRate;
    const principal = payment - interest;
    remaining -= principal;
    totalInterest += interest;
    months++;

    // Avoid negative remaining balance
    if (months > 1000) {
      resultBox.innerHTML = "<p>Calculation exceeds 1000 months. Please check your inputs.</p>";
      return;
    }
  }

  const years = Math.floor(months / 12);
  const remMonths = months % 12;

  resultBox.innerHTML = `
    <p><strong>Time to Payoff:</strong> ${years} years and ${remMonths} months</p>
    <p><strong>Total Interest Paid:</strong> $${totalInterest.toFixed(2)}</p>
    <p><strong>Total Payments:</strong> $${(totalInterest + balance).toFixed(2)}</p>
  `;

  scrollToResult();
}

function scrollToResult() {
  const resultCard = document.getElementById("resultCard");
  resultCard.classList.add("highlight");
  resultCard.scrollIntoView({ behavior: "smooth", block: "center" });

  setTimeout(() => resultCard.classList.remove("highlight"), 2000);
}

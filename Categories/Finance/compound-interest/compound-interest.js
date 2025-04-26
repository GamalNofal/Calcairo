function calculateCompound() {
  const principal = parseFloat(document.getElementById("principal").value);
  const rate = parseFloat(document.getElementById("rate").value);
  const years = parseFloat(document.getElementById("years").value);
  const frequency = parseInt(document.getElementById("frequency").value);
  const resultBox = document.getElementById("compoundResult");

  if (isNaN(principal) || isNaN(rate) || isNaN(years) || isNaN(frequency)) {
    resultBox.innerHTML = "<p>Please fill in all fields with valid numbers.</p>";
    return;
  }

  const r = rate / 100;
  const compoundAmount = principal * Math.pow((1 + r / frequency), frequency * years);
  const interestEarned = compoundAmount - principal;

  resultBox.innerHTML = `
    <p><strong>Final Amount:</strong> $${compoundAmount.toFixed(2)}</p>
    <p><strong>Total Interest Earned:</strong> $${interestEarned.toFixed(2)}</p>
    <p class="bmi-label">Based on compounding <strong>${frequency} time(s) per year</strong> over <strong>${years} years</strong>.</p>
  `;

  scrollToResult();
}

function scrollToResult() {
  const resultCard = document.getElementById("resultCard");
  resultCard.classList.add("highlight");
  resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
  setTimeout(() => resultCard.classList.remove("highlight"), 2000);
}

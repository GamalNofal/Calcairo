function calculateBudget() {
  const income = parseFloat(document.getElementById("income").value) || 0;
  const rent = parseFloat(document.getElementById("rent").value) || 0;
  const food = parseFloat(document.getElementById("food").value) || 0;
  const transport = parseFloat(document.getElementById("transport").value) || 0;
  const utilities = parseFloat(document.getElementById("utilities").value) || 0;
  const entertainment = parseFloat(document.getElementById("entertainment").value) || 0;
  const other = parseFloat(document.getElementById("other").value) || 0;

  const totalExpenses = rent + food + transport + utilities + entertainment + other;
  const savings = income - totalExpenses;
  const percentSpent = income > 0 ? ((totalExpenses / income) * 100).toFixed(1) : 0;

  let status = "";
  if (savings > 0) {
    status = `<p style="color:green;">🎉 You're saving <strong>$${savings.toFixed(2)}</strong> this month!</p>`;
  } else if (savings < 0) {
    status = `<p style="color:red;">⚠️ You're overspending by <strong>$${Math.abs(savings).toFixed(2)}</strong>. Consider reducing expenses.</p>`;
  } else {
    status = `<p style="color:#f39c12;">😐 You're breaking even with no savings.</p>`;
  }

  const resultBox = document.getElementById("budgetResult");
  resultBox.innerHTML = `
    <p><strong>Total Expenses:</strong> $${totalExpenses.toFixed(2)}</p>
    <p><strong>Percent of Income Spent:</strong> ${percentSpent}%</p>
    ${status}
  `;

  scrollToResult();
}

function scrollToResult() {
  const resultCard = document.getElementById("resultCard");
  resultCard.classList.add("highlight");
  resultCard.scrollIntoView({ behavior: "smooth", block: "center" });

  setTimeout(() => resultCard.classList.remove("highlight"), 2000);
}

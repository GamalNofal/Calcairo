document.addEventListener("DOMContentLoaded", () => {
  const householdInput = document.getElementById("householdSize");
  const rollsPerWeekInput = document.getElementById("rollsPerWeek");
  const pricePerRollInput = document.getElementById("pricePerRoll");
  const ageInput = document.getElementById("age");
  const expectancyInput = document.getElementById("lifeExpectancy");
  const calculateBtn = document.getElementById("calculateBtn");
  const resultBox = document.getElementById("resultBox");
  const resultCard = document.getElementById("resultCard");

  calculateBtn.addEventListener("click", () => {
    const household = parseInt(householdInput.value);
    const weeklyRolls = parseFloat(rollsPerWeekInput.value);
    const pricePerRoll = parseFloat(pricePerRollInput.value);
    const age = parseInt(ageInput.value);
    const expectancy = parseInt(expectancyInput.value);

    if (
      isNaN(household) || household <= 0 ||
      isNaN(weeklyRolls) || weeklyRolls <= 0 ||
      isNaN(pricePerRoll) || pricePerRoll <= 0 ||
      isNaN(age) || age < 1 || age > 120 ||
      isNaN(expectancy) || expectancy <= age || expectancy > 120
    ) {
      resultBox.innerHTML = "<p>Please enter valid values for all fields.</p>";
      return;
    }

    const yearsLeft = expectancy - age;
    const yearlyRollsPerPerson = weeklyRolls * 52;
    const lifetimeRollsPerPerson = yearlyRollsPerPerson * yearsLeft;
    const totalHouseholdRolls = lifetimeRollsPerPerson * household;
    const totalCost = totalHouseholdRolls * pricePerRoll;

    resultBox.innerHTML = `
      <p>🧻 <strong>Yearly Usage (per person):</strong> ${yearlyRollsPerPerson.toFixed(0)} rolls</p>
      <p>🕰️ <strong>Years Left:</strong> ${yearsLeft}</p>
      <p>🏠 <strong>Total Household Usage:</strong> ${totalHouseholdRolls.toLocaleString()} rolls</p>
      <p>💰 <strong>Estimated Cost:</strong> $${totalCost.toFixed(2)}</p>
      <p style="margin-top: 1rem; font-size: 0.9rem; color: #555;">
        😅 That's a lot of wiping. Maybe stock up smart.
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

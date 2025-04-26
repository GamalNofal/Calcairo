document.addEventListener("DOMContentLoaded", () => {
  const hourlyRateInput = document.getElementById("hourlyRate");
  const hoursPerWeekInput = document.getElementById("hoursPerWeek");
  const weeksPerYearInput = document.getElementById("weeksPerYear");
  const taxRateInput = document.getElementById("taxRate");
  const vacationDaysInput = document.getElementById("vacationDays");
  const holidaysInput = document.getElementById("holidays");

  const calculateBtn = document.getElementById("calculateBtn");
  const resultBox = document.getElementById("resultBox");
  const resultCard = document.getElementById("resultCard");

  calculateBtn.addEventListener("click", () => {
    const hourlyRate = parseFloat(hourlyRateInput.value);
    const hoursPerWeek = parseFloat(hoursPerWeekInput.value);
    const weeksPerYear = parseFloat(weeksPerYearInput.value);

    const taxRate = parseFloat(taxRateInput.value) || 0;
    const vacationDays = parseInt(vacationDaysInput.value) || 0;
    const holidays = parseInt(holidaysInput.value) || 0;

    if (
      isNaN(hourlyRate) || hourlyRate <= 0 ||
      isNaN(hoursPerWeek) || hoursPerWeek <= 0 ||
      isNaN(weeksPerYear) || weeksPerYear <= 0
    ) {
      resultBox.innerHTML = "<p>Please enter valid numbers for hourly rate, hours/week, and weeks/year.</p>";
      return;
    }

    // Gross salary
    const grossYearly = hourlyRate * hoursPerWeek * weeksPerYear;
    const grossMonthly = grossYearly / 12;
    const grossWeekly = hourlyRate * hoursPerWeek;
    const grossDaily = grossWeekly / 5;

    // Net salary after tax
    const netYearly = grossYearly * (1 - taxRate / 100);
    const netMonthly = netYearly / 12;

    // Working day adjustment
    const totalDaysPerYear = 365;
    const totalOffDays = vacationDays + holidays;
    const workDays = totalDaysPerYear - totalOffDays;
    const workHoursPerYear = workDays * (hoursPerWeek / 5); // Assume 5-day workweek
    const adjustedHourlyFromNet = netYearly / workHoursPerYear;

    // Results
    resultBox.innerHTML = `
      <p><strong>Gross Yearly Salary:</strong> $${grossYearly.toFixed(2)}</p>
      <p><strong>Gross Monthly Pay:</strong> $${grossMonthly.toFixed(2)}</p>
      <p><strong>Gross Weekly Pay:</strong> $${grossWeekly.toFixed(2)}</p>
      <p><strong>Gross Daily Pay:</strong> $${grossDaily.toFixed(2)}</p>
      <hr />
      <p><strong>Net Yearly Salary (after ${taxRate}% tax):</strong> $${netYearly.toFixed(2)}</p>
      <p><strong>Net Monthly Pay:</strong> $${netMonthly.toFixed(2)}</p>
      <p><strong>Estimated Work Days/Year:</strong> ${workDays} days</p>
      <p><strong>Adjusted Hourly (Net / True Hours):</strong> $${adjustedHourlyFromNet.toFixed(2)}</p>
    `;

    scrollToResult();
  });

  function scrollToResult() {
    resultCard.classList.add("highlight");
    resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => resultCard.classList.remove("highlight"), 2000);
  }
});

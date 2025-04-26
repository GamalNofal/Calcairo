document.addEventListener("DOMContentLoaded", () => {
  const quickButtons = document.querySelectorAll(".year-btn");
  const yearInput = document.getElementById("yearsAgo");
  const startDateInput = document.getElementById("startDate");
  const resultBox = document.getElementById("resultBox");
  const resultCard = document.getElementById("resultCard");

  // Fill date with today
  document.getElementById("nowLink").addEventListener("click", () => {
    const today = new Date().toISOString().split("T")[0];
    startDateInput.value = today;
  });

  // Quick-select buttons
  quickButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      yearInput.value = btn.getAttribute("data-value");
    });
  });

  // Proper function definition
  function calculatePastDate() {
    const years = parseInt(yearInput.value);
    const startDate = new Date(startDateInput.value);

    if (isNaN(years) || !startDateInput.value) {
      resultBox.innerHTML = "<p>Please enter valid number of years and start date.</p>";
      return;
    }

    const resultDate = new Date(startDate);
    resultDate.setFullYear(resultDate.getFullYear() - years);

    const options = { year: "numeric", month: "long", day: "numeric" };
    resultBox.innerHTML = `<p>${years} years ago from ${startDate.toLocaleDateString()} is <strong>${resultDate.toLocaleDateString(undefined, options)}</strong>.</p>`;

    scrollToResult();
  }

  // Attach listener
  document.getElementById("calculateBtn").addEventListener("click", calculatePastDate);

  function scrollToResult() {
    resultCard.classList.add("highlight");
    resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => resultCard.classList.remove("highlight"), 2000);
  }
});

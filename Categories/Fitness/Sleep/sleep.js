function calculateSleepTimes() {
  const wakeInput = document.getElementById("wakeTime").value;
  const resultBox = document.getElementById("sleepResults");
  const ageGroup = document.getElementById("ageGroup").value;

  if (!wakeInput) {
    resultBox.innerHTML = `<p>Please enter your wake-up time.</p>`;
    return;
  }

  // Set recommended cycles based on age group
  let cycles = [6, 5, 4, 3]; // default
  if (ageGroup === "8") {
    cycles = [6, 5, 4]; // Teen (14–17)
  } else if (ageGroup === "7") {
    cycles = [5, 4, 3]; // Adult (18–64)
  } else if (ageGroup === "7.5") {
    cycles = [4, 3]; // Older Adult (65+)
  }

  const [wakeHour, wakeMinute] = wakeInput.split(":").map(Number);
  const wakeDate = new Date();
  wakeDate.setHours(wakeHour, wakeMinute, 0, 0);

  const sleepTimes = cycles.map(cycle => {
    const time = new Date(wakeDate.getTime() - cycle * 90 * 60000);
    const h = time.getHours();
    const m = time.getMinutes().toString().padStart(2, "0");
    const suffix = h >= 12 ? "PM" : "AM";
    const hour12 = ((h + 11) % 12 + 1);
    return `${hour12}:${m} ${suffix}`;
  });

  resultBox.innerHTML = `
    <ul>
      ${sleepTimes.map(time => `<li>🛏️ ${time}</li>`).join("")}
    </ul>
    <p class="bmi-label">These are ideal sleep times based on 90-minute sleep cycles and 15 minutes to fall asleep.</p>
  `;

  scrollToResult();
}

function scrollToResult() {
  const resultCard = document.getElementById("resultCard");
  resultCard.classList.add("highlight");
  resultCard.scrollIntoView({ behavior: "smooth", block: "center" });

  setTimeout(() => resultCard.classList.remove("highlight"), 2000);
}

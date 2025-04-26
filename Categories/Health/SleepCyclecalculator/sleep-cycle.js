document.addEventListener("DOMContentLoaded", () => {
    const mode = document.getElementById("mode");
    const timeInput = document.getElementById("timeInput");
    const calculateBtn = document.getElementById("calculateBtn");
    const resultBox = document.getElementById("resultBox");
    const resultCard = document.getElementById("resultCard");
  
    const cycleMinutes = 90;
    const fallAsleepBuffer = 15;
    const numberOfCycles = [6, 5, 4]; // 9, 7.5, 6 hours = ideal cycle sets
  
    calculateBtn.addEventListener("click", () => {
      const inputTime = timeInput.value;
  
      if (!inputTime) {
        resultBox.innerHTML = "<p>Please select a time.</p>";
        return;
      }
  
      const [hours, minutes] = inputTime.split(":").map(Number);
      const inputDate = new Date();
      inputDate.setHours(hours);
      inputDate.setMinutes(minutes);
      inputDate.setSeconds(0);
  
      let times = [];
  
      if (mode.value === "wake") {
        // Calculate backwards
        numberOfCycles.forEach(cycles => {
          const totalMinutes = (cycles * cycleMinutes) + fallAsleepBuffer;
          const time = new Date(inputDate.getTime() - totalMinutes * 60000);
          times.push(formatTime(time));
        });
      } else {
        // Calculate forward
        numberOfCycles.forEach(cycles => {
          const totalMinutes = (cycles * cycleMinutes) + fallAsleepBuffer;
          const time = new Date(inputDate.getTime() + totalMinutes * 60000);
          times.push(formatTime(time));
        });
      }
  
      const label = mode.value === "wake" ? "Go to bed at:" : "Wake up at:";
      resultBox.innerHTML = `
        <p><strong>${label}</strong></p>
        <p>${times.join(" • ")}</p>
        <p style="margin-top: 1rem; font-size: 0.9rem; color: #555;">
          💤 Based on 90-minute sleep cycles + ~15 minutes to fall asleep.
        </p>
      `;
  
      scrollToResult();
    });
  
    function formatTime(date) {
      let h = date.getHours();
      const m = date.getMinutes().toString().padStart(2, "0");
      const ampm = h >= 12 ? "PM" : "AM";
      h = h % 12 || 12;
      return `${h}:${m} ${ampm}`;
    }
  
    function scrollToResult() {
      resultCard.classList.add("highlight");
      resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => resultCard.classList.remove("highlight"), 2000);
    }
  });
  
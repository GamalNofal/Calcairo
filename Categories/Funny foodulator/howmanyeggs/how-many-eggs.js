document.addEventListener("DOMContentLoaded", () => {
    const ageInput = document.getElementById("age");
    const eggsPerWeekInput = document.getElementById("weeklyEggs");
    const resultBox = document.getElementById("resultBox");
    const resultCard = document.getElementById("resultCard");
    const calculateBtn = document.getElementById("calculateBtn");
  
    calculateBtn.addEventListener("click", () => {
      const age = parseInt(ageInput.value);
      const eggsPerWeek = parseInt(eggsPerWeekInput.value);
  
      if (isNaN(age) || isNaN(eggsPerWeek) || age < 1 || age > 120 || eggsPerWeek < 0) {
        resultBox.innerHTML = "<p>Please enter a valid age and weekly egg amount.</p>";
        return;
      }
  
      const averageLifespan = 85;
      const weeksPerYear = 52;
  
      const eggsSoFar = age * weeksPerYear * eggsPerWeek;
      const eggsFuture = (averageLifespan - age) * weeksPerYear * eggsPerWeek;
      const totalLifetimeEggs = eggsSoFar + eggsFuture;
  
      const comment = getEggComment(totalLifetimeEggs);
  
      resultBox.innerHTML = `
        <p><strong>Eggs you've probably eaten so far:</strong> ${eggsSoFar.toLocaleString()} 🥚</p>
        <p><strong>Estimated lifetime total:</strong> ${totalLifetimeEggs.toLocaleString()} eggs</p>
        <p>${comment}</p>
      `;
  
      scrollToResult();
    });
  
    function getEggComment(total) {
      if (total >= 50000) return "🥚 You are a certified Egg Legend. Chickens salute you.";
      if (total >= 25000) return "🥚 That’s enough eggs to fill a swimming pool. Impressive.";
      if (total >= 10000) return "🥚 A solid yolky legacy. Omelets forever.";
      if (total >= 5000) return "🥚 You’re in the Egg Club. Welcome.";
      if (total >= 1000) return "🥚 Not bad! Your protein game is strong.";
      return "🥚 A gentle egg life. No judgment. Maybe tofu's your thing?";
    }
  
    function scrollToResult() {
      resultCard.classList.add("highlight");
      resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => resultCard.classList.remove("highlight"), 2000);
    }
  });
  
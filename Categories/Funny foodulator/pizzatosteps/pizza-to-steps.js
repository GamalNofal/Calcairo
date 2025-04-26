document.addEventListener("DOMContentLoaded", () => {
    const slicesInput = document.getElementById("slices");
    const weightInput = document.getElementById("weight");
    const resultBox = document.getElementById("resultBox");
    const resultCard = document.getElementById("resultCard");
    const calculateBtn = document.getElementById("calculateBtn");
  
    calculateBtn.addEventListener("click", () => {
      const slices = parseInt(slicesInput.value);
      const weight = parseFloat(weightInput.value);
  
      if (isNaN(slices) || isNaN(weight) || slices < 1 || weight < 20 || weight > 200) {
        resultBox.innerHTML = "<p>Please enter a valid number of slices and your weight in kg.</p>";
        return;
      }
  
      const caloriesPerSlice = 285; // average pizza slice
      const totalCalories = slices * caloriesPerSlice;
  
      // Average person burns ~0.04 kcal per step
      const caloriesPerStep = 0.04;
      const steps = Math.ceil(totalCalories / caloriesPerStep);
  
      // Optional: estimated time walking (assuming 100 steps/min)
      const minutesWalking = Math.ceil(steps / 100);
  
      resultBox.innerHTML = `
        <p>🍕 You consumed about <strong>${totalCalories.toLocaleString()}</strong> calories from ${slices} slice(s) of pizza.</p>
        <p>👣 You’d need to walk approximately <strong>${steps.toLocaleString()}</strong> steps to burn that off.</p>
        <p>⏱️ That’s roughly <strong>${minutesWalking}</strong> minutes of non-stop walking.</p>
        <p>${getPizzaComment(steps)}</p>
      `;
  
      scrollToResult();
    });
  
    function getPizzaComment(steps) {
      if (steps >= 30000) return "🔥 Hope you packed snacks. You’ll need a national park for this stroll.";
      if (steps >= 15000) return "🚶‍♀️ That’s a long walk. Maybe carry another slice as motivation?";
      if (steps >= 8000) return "🥵 You might want comfy shoes... and a podcast.";
      if (steps >= 4000) return "🥴 Manageable, but you’ll feel it in your calves.";
      return "😎 Easy peasy. Pizza was basically salad.";
    }
  
    function scrollToResult() {
      resultCard.classList.add("highlight");
      resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => resultCard.classList.remove("highlight"), 2000);
    }
  });
  
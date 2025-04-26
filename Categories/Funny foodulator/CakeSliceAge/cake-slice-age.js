document.addEventListener("DOMContentLoaded", () => {
    const ageInput = document.getElementById("age");
    const slicesInput = document.getElementById("slicesPerYear");
    const resultBox = document.getElementById("resultBox");
    const resultCard = document.getElementById("resultCard");
    const calculateBtn = document.getElementById("calculateBtn");
  
    calculateBtn.addEventListener("click", () => {
      const age = parseInt(ageInput.value);
      const slicesPerYear = parseInt(slicesInput.value);
  
      if (isNaN(age) || isNaN(slicesPerYear) || age <= 0 || slicesPerYear <= 0) {
        resultBox.innerHTML = "<p>Please enter a valid age and number of slices per year.</p>";
        return;
      }
  
      const totalSlices = age * slicesPerYear;
      const calories = totalSlices * 350; // average slice is ~350 calories
      const cakes = Math.floor(totalSlices / 8); // assuming 8 slices per cake
  
      const message = getCakeComment(totalSlices);
  
      resultBox.innerHTML = `
        <p>🎂 <strong>Total Cake Slices:</strong> ${totalSlices.toLocaleString()}</p>
        <p>🧁 That's roughly <strong>${cakes}</strong> whole cakes!</p>
        <p>🔥 Estimated calories: <strong>${calories.toLocaleString()}</strong></p>
        <p>${message}</p>
      `;
  
      scrollToResult();
    });
  
    function getCakeComment(slices) {
      if (slices >= 1000) return "🍰 You've lived the frosted life. Legend.";
      if (slices >= 500) return "🎉 That’s enough cake to build a throne.";
      if (slices >= 200) return "🥄 That’s a sweet history. You're frosting-fueled.";
      if (slices >= 100) return "🍰 Pretty tasty journey so far!";
      return "🎂 Still early in your cake journey — save room for more!";
    }
  
    function scrollToResult() {
      resultCard.classList.add("highlight");
      resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => resultCard.classList.remove("highlight"), 2000); // consistent delay
    }
  });
  
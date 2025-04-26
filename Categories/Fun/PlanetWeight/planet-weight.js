// planet-weight.js

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("planetForm");
    const resultCard = document.getElementById("resultCard");
    const weightResults = document.getElementById("weightResults");
    const tryAgainBtn = document.getElementById("tryAgain");
  
    const planets = {
      Moon: 0.165,
      Mars: 0.38,
      Jupiter: 2.34,
      Saturn: 1.06,
      Pluto: 0.06,
      Sun: 27.01 // Just for fun!
    };
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const earthWeight = parseFloat(document.getElementById("earthWeight").value);
  
      if (isNaN(earthWeight) || earthWeight <= 0) {
        weightResults.innerHTML = `<p>❌ Please enter a valid positive weight!</p>`;
        resultCard.style.display = "block";
        return;
      }
  
      let resultsHTML = "";
  
      for (const [planet, gravity] of Object.entries(planets)) {
        const planetWeight = (earthWeight * gravity).toFixed(1);
        resultsHTML += `<p><strong>${planet}</strong>: ${planetWeight} kg</p>`;
      }
  
      weightResults.innerHTML = resultsHTML;
      resultCard.style.display = "block";
  
      highlightResult();
    });
  
    tryAgainBtn.addEventListener("click", () => {
      form.reset();
      resultCard.style.display = "none";
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  
    function highlightResult() {
      resultCard.classList.add("glow");
      resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => {
        resultCard.classList.remove("glow");
      }, 2000);
    }
  });
  
// superpower-calculator.js

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("superpowerForm");
    const resultCard = document.getElementById("resultCard");
    const resultBox = document.getElementById("superpowerResult");
    const tryAgainBtn = document.getElementById("tryAgain");
  
    const superpowers = {
      telekinesis: 0,
      invisibility: 0,
      super_speed: 0,
      shapeshifting: 0,
      elemental_control: 0,
      healing: 0,
      energy_blasts: 0,
      time_manipulation: 0
    };
  
    const powerEmojis = {
      telekinesis: "🧠",
      invisibility: "👻",
      super_speed: "⚡",
      shapeshifting: "🐺",
      elemental_control: "🌪️",
      healing: "✨",
      energy_blasts: "🔥",
      time_manipulation: "⏳"
    };
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const birthMonth = document.getElementById("birthMonth").value;
      const favoriteColor = document.getElementById("favoriteColor").value;
      const luckyNumber = parseInt(document.getElementById("luckyNumber").value);
  
      if (!birthMonth || !favoriteColor || isNaN(luckyNumber)) {
        resultBox.innerHTML = "<p>❌ Please complete all fields correctly!</p>";
        resultCard.style.display = "block";
        return;
      }
  
      // Reset scores
      for (const power in superpowers) {
        superpowers[power] = 0;
      }
  
      // Scoring based on birth month
      if (["jan", "apr", "jul", "oct"].includes(birthMonth)) {
        superpowers.telekinesis += 3;
        superpowers.energy_blasts += 2;
      } else if (["feb", "may", "aug", "nov"].includes(birthMonth)) {
        superpowers.invisibility += 3;
        superpowers.healing += 2;
      } else {
        superpowers.super_speed += 3;
        superpowers.shapeshifting += 2;
      }
  
      // Scoring based on favorite color
      if (["red", "orange"].includes(favoriteColor)) {
        superpowers.energy_blasts += 3;
      } else if (["blue", "green"].includes(favoriteColor)) {
        superpowers.elemental_control += 3;
      } else if (["black", "purple"].includes(favoriteColor)) {
        superpowers.time_manipulation += 3;
      } else if (["white", "yellow", "pink"].includes(favoriteColor)) {
        superpowers.healing += 3;
      }
  
      // Scoring based on lucky number
      if (luckyNumber % 2 === 0) {
        superpowers.invisibility += 2;
        superpowers.telekinesis += 2;
      } else {
        superpowers.super_speed += 2;
        superpowers.shapeshifting += 2;
      }
  
      if (luckyNumber > 50) {
        superpowers.time_manipulation += 2;
        superpowers.energy_blasts += 2;
      }
  
      // Find the highest score
      const sortedPowers = Object.entries(superpowers).sort((a, b) => b[1] - a[1]);
      const [topPower, topScore] = sortedPowers[0];
  
      // Calculate compatibility %
      const compatibility = Math.min(100, 60 + topScore * 8); // fun scale
  
      // Display result
      const displayName = topPower.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase());
  
      resultBox.innerHTML = `
        <p><span style="font-size:2rem;">${powerEmojis[topPower]}</span></p>
        <p><strong>Your Potential Superpower is:</strong></p>
        <p style="font-size:1.5rem;margin-top:8px;">${displayName}</p>
        <p style="margin-top:1rem;"><em>Compatibility: ${compatibility}%</em></p>
      `;
  
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
  
// pet-iq.js

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("petIqForm");
    const resultCard = document.getElementById("resultCard");
    const resultBox = document.getElementById("petIqResult");
    const tryAgainBtn = document.getElementById("tryAgain");
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const petAge = parseFloat(document.getElementById("petAge").value);
      const favoriteToy = document.getElementById("favoriteToy").value;
      const napHours = parseFloat(document.getElementById("napHours").value);
  
      if (isNaN(petAge) || isNaN(napHours) || !favoriteToy || petAge < 0 || napHours < 0) {
        resultBox.innerHTML = "<p>❌ Please enter valid positive numbers and select a toy!</p>";
        resultCard.style.display = "block";
        return;
      }
  
      let iqScore = 50; // Base IQ
  
      // Age factor
      if (petAge <= 2) {
        iqScore += 30; // young and curious
      } else if (petAge <= 7) {
        iqScore += 20; // energetic prime
      } else {
        iqScore += 10; // wise and calm
      }
  
      // Favorite toy bonus
      switch (favoriteToy) {
        case "ball":
          iqScore += 20;
          break;
        case "rope":
          iqScore += 15;
          break;
        case "laser":
          iqScore += 25;
          break;
        case "squeaky":
          iqScore += 10;
          break;
        case "stick":
          iqScore += 12;
          break;
        case "sock":
          iqScore += 18;
          break;
        default:
          break;
      }
  
      // Nap hours impact
      if (napHours <= 4) {
        iqScore += 20; // alert genius
      } else if (napHours <= 8) {
        iqScore += 10; // balanced
      } else {
        iqScore += 5; // dreamy genius
      }
  
      // Random small bonus for unpredictability
      iqScore += Math.floor(Math.random() * 6); // +0 to +5
  
      // Max IQ cap
      iqScore = Math.min(Math.round(iqScore), 200);
  
      const interpretation = getIqInterpretation(iqScore);
      const funFact = getRandomFunFact();
  
      resultBox.innerHTML = `
        <p><strong>Estimated Pet IQ:</strong></p>
        <p style="font-size:1.6rem;margin-top:8px;">${iqScore} 🧠</p>
        <p style="margin-top:1rem;"><em>${interpretation}</em></p>
        <hr style="margin: 1.5rem 0;">
        <p><small>🐾 Fun Fact:</small></p>
        <p style="font-size:0.95rem;">${funFact}</p>
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
  
    function getIqInterpretation(score) {
      if (score >= 170) return "🚀 Tactical Genius – Your pet could lead a space mission!";
      if (score >= 140) return "🎓 Hyper Brainiac – Your pet might outsmart you!";
      if (score >= 110) return "🐾 Clever Explorer – Curious and smart.";
      if (score >= 80) return "💤 Dreamy Thinker – Smart but chill!";
      return "🎈 Playful Free Spirit – Lives happily without overthinking!";
    }
  
    function getRandomFunFact() {
      const facts = [
        "Dogs can learn over 165 words and gestures!",
        "Cats can jump up to six times their body length!",
        "Some parrots have the intelligence of a 5-year-old child!",
        "Hamsters can run up to 8 miles a night on their wheel!",
        "Goldfish have a memory span longer than 3 months!"
      ];
      return facts[Math.floor(Math.random() * facts.length)];
    }
  });
  
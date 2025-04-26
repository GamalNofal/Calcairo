// friendship-strength.js

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("friendshipForm");
    const resultCard = document.getElementById("resultCard");
    const resultBox = document.getElementById("friendshipResult");
    const tryAgainBtn = document.getElementById("tryAgain");
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const yearsKnown = parseFloat(document.getElementById("yearsKnown").value);
      const hoursTalked = parseFloat(document.getElementById("hoursTalked").value);
      const sharedTrips = parseFloat(document.getElementById("sharedTrips").value);
  
      if (isNaN(yearsKnown) || isNaN(hoursTalked) || isNaN(sharedTrips) ||
          yearsKnown < 0 || hoursTalked < 0 || sharedTrips < 0) {
        resultBox.innerHTML = "<p>❌ Please enter valid positive numbers!</p>";
        resultCard.style.display = "block";
        return;
      }
  
      // Calculate friendship strength
      let score = 0;
      score += Math.min(yearsKnown * 4, 40); // Years known max 40 points
      score += Math.min(hoursTalked * 3, 30); // Hours talked max 30 points
      score += Math.min(sharedTrips * 3, 30); // Trips max 30 points
  
      // Bonus for very long friendships
      if (yearsKnown >= 10) {
        score += 5;
      }
  
      score = Math.min(Math.round(score), 100); // Max score = 100
  
      const giftIdea = getGiftSuggestion(score);
  
      resultBox.innerHTML = `
        <p><strong>Friendship Strength Score:</strong></p>
        <p style="font-size:1.5rem; margin: 10px 0;">${score}/100 💚</p>
        <p><strong>Gift Idea:</strong> ${giftIdea}</p>
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
  
    function getGiftSuggestion(score) {
      if (score >= 90) {
        return "Custom Jewelry or a Best Friend Pendant 💎";
      } else if (score >= 70) {
        return "A Fun Weekend Trip or Experience ✈️";
      } else if (score >= 50) {
        return "A Thoughtful Handwritten Letter or Gift Basket 🎁";
      } else if (score >= 30) {
        return "A Movie Night or a Personalized Mug 🎬☕";
      } else {
        return "A Coffee Treat — Time to Bond More! ☕🤝";
      }
    }
  });
  
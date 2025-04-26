document.addEventListener("DOMContentLoaded", () => {
    const spendingInput = document.getElementById("spending");
    const happinessInput = document.getElementById("happiness");
    const durationInput = document.getElementById("duration");
    const resultBox = document.getElementById("resultBox");
    const resultCard = document.getElementById("resultCard");
    const calculateBtn = document.getElementById("calculateBtn");
  
    calculateBtn.addEventListener("click", () => {
      const cost = parseFloat(spendingInput.value);
      const happiness = parseFloat(happinessInput.value);
      const days = parseFloat(durationInput.value);
  
      if (
        isNaN(cost) || cost <= 0 ||
        isNaN(happiness) || happiness < 1 || happiness > 10 ||
        isNaN(days) || days <= 0
      ) {
        resultBox.innerHTML = "<p>Please fill in all fields with valid values.</p>";
        return;
      }
  
      const happinessPoints = happiness * days;
      const costPerPoint = cost / happinessPoints;
      const happinessPerDollar = happinessPoints / cost;
  
      const quotes = [
        "Joy is priceless. But this came pretty close! 😄",
        "That’s some solid joy-to-dollar ratio 📈",
        "Not bad for something that made you smile for days!",
        "Smiles per dollar: approved! ✅",
        "Invest in joy — it pays emotional dividends 💚",
        "Could've been worse. At least you're happy 😂",
        "ROI = Really Outstanding Intensity (of joy) 🎉",
        "You're buying happiness, and it's working!",
        "This one sparked joy. Marie Kondo would approve 🧺✨",
        "You basically bought a small vacation for your heart 💖",
        "Well worth it for that serotonin spike 🔥",
        "Would swipe the card again 🛍️",
        "This is what we call emotional return on investment 💡",
        "Smiles delivered. Bank balance slightly annoyed 😅",
        "Not bad, considering it made your day(s) 🌞",
        "That’s happiness well spent 🎯",
        "You’re rich... in moments that mattered 💫",
        "A latte couldn’t do that. Nice pick ☕",
        "Proof that little joys go a long way 🛤️",
        "Happiness: 10/10. Your wallet: 4/10 😬"
      ];
  
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  
      resultBox.innerHTML = `
        <p><strong>Total Happiness Points:</strong> ${happinessPoints.toFixed(1)}</p>
        <p><strong>Cost per Happiness Point:</strong> $${costPerPoint.toFixed(2)}</p>
        <p><strong>Happiness per Dollar:</strong> ${happinessPerDollar.toFixed(2)} pts/$</p>
        <p style="margin-top: 1rem; font-size: 0.95rem; color: #555;">💬 ${randomQuote}</p>
      `;
  
      scrollToResult();
    });
  
    function scrollToResult() {
      resultCard.classList.add("highlight");
      resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => resultCard.classList.remove("highlight"), 2000);
    }
  });
  
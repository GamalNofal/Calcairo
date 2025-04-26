document.addEventListener("DOMContentLoaded", () => {
    const style = document.getElementById("style");
    const speed = document.getElementById("speed");
    const dish = document.getElementById("dish");
    const resultBox = document.getElementById("resultBox");
    const resultCard = document.getElementById("resultCard");
    const generateBtn = document.getElementById("generateBtn");
  
    const auras = [
      {
        id: "zen",
        emoji: "🧘‍♀️🥢",
        name: "Zen Noodle Whisperer",
        description: "Your chopsticks flow with harmony. Calm, composed, and noodle-aligned.",
      },
      {
        id: "chaos",
        emoji: "😅🥢",
        name: "Chaotic Bite Chaser",
        description: "Food flies, fingers flail — but you get there. A mess with flavor.",
      },
      {
        id: "fork",
        emoji: "🍴🥢",
        name: "Fork In Disguise",
        description: "You're not fooling anyone. You stab your sushi. It works, but wow.",
      },
      {
        id: "toddler",
        emoji: "🍼🥢",
        name: "Rubber Band Rookie",
        description: "Adorable effort. We applaud the persistence. Keep munching, little legend.",
      },
      {
        id: "master",
        emoji: "🐉🥢",
        name: "Dim Sum Dragon",
        description: "Fast. Focused. Legendary. You were born in a bamboo steamer.",
      }
    ];
  
    const wisdoms = [
      "Two sticks. One destiny.",
      "The noodles are watching.",
      "Even broken chopsticks can deliver greatness.",
      "Drop less. Savor more.",
      "Mastery is one dumpling away.",
      "You pick up more than food. You pick up energy.",
      "Let the soy sauce flow through you.",
      "Slurping is not rude — it's respectful flavor thunder.",
    ];
  
    generateBtn.addEventListener("click", () => {
      const styleVal = style.value;
      const speedVal = speed.value;
      const dishVal = dish.value;
  
      let match;
  
      // Aura logic
      if (styleVal === "graceful" && speedVal === "slow") {
        match = auras.find(a => a.id === "zen");
      } else if (styleVal === "graceful" && speedVal === "fast") {
        match = auras.find(a => a.id === "master");
      } else if (styleVal === "stab") {
        match = auras.find(a => a.id === "fork");
      } else if (styleVal === "rubber") {
        match = auras.find(a => a.id === "toddler");
      } else {
        match = auras.find(a => a.id === "chaos");
      }
  
      const fortune = wisdoms[Math.floor(Math.random() * wisdoms.length)];
  
      resultBox.innerHTML = `
        <p style="font-size: 2rem;">${match.emoji}</p>
        <p><strong>You Are:</strong> ${match.name}</p>
        <p><em>${match.description}</em></p>
        <p style="margin-top: 1rem; font-style: italic;">🥢 ${fortune}</p>
      `;
  
      scrollToResult();
    });
  
    function scrollToResult() {
      resultCard.classList.add("highlight");
      resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => resultCard.classList.remove("highlight"), 2000);
    }
  });
  
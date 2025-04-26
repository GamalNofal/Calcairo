document.addEventListener("DOMContentLoaded", () => {
    const frequency = document.getElementById("frequency");
    const raw = document.getElementById("raw");
    const vampire = document.getElementById("vampire");
    const resultBox = document.getElementById("resultBox");
    const resultCard = document.getElementById("resultCard");
    const calculateBtn = document.getElementById("calculateBtn");
  
    const garlicWisdoms = [
      "You could walk into a vampire’s house and turn it into an Italian restaurant.",
      "Your hugs smell like roasted dinner. That’s a compliment.",
      "You don't sweat — you simmer.",
      "Garlic bread is your birthright.",
      "You once scared a vampire just by opening a lunchbox.",
      "You're one sneeze away from starting a pasta sauce.",
      "You think perfume should come in garlic oil.",
      "You treat cloves like candy.",
      "Legend says your shadow smells like marinara.",
      "You whisper sweet nothings... and they smell like aioli.",
      "You once got mistaken for a walking bruschetta.",
      "You sweat spice. Garlic is your aura.",
      "If garlic were currency, you'd be a millionaire.",
      "You’re 70% garlic and 30% smug pride.",
      "They don’t call it 'gar-lick' for nothing — you're irresistible.",
      "You don't chew cloves — they submit willingly.",
      "Michelangelo would've painted your breath into The Last Supper.",
      "Even garlic fears how much you love garlic.",
      "You once declared garlic your emergency contact.",
      "Your kisses can season an entire salad."
    ];
  
    calculateBtn.addEventListener("click", () => {
      const score = 
        parseInt(frequency.value) * 3 + 
        parseInt(raw.value) * 2 + 
        parseInt(vampire.value) * 4;
  
      const level = getGarlicLevel(score);
      const wisdom = getRandomGarlicQuote();
  
      resultBox.innerHTML = `
        <p style="font-size: 2rem;">${level.emoji}</p>
        <p><strong>Garlic Intensity:</strong> ${score}/30</p>
        <p><strong>Rank:</strong> ${level.title}</p>
        <p><em>${level.message}</em></p>
        <p style="margin-top: 1rem; font-style: italic;">🧄 Bonus Garlic Wisdom:<br>"${wisdom}"</p>
      `;
  
      scrollToResult();
    });
  
    function getGarlicLevel(score) {
      if (score >= 26) {
        return {
          emoji: "🧄🧄🧄",
          title: "Vampire Slayer Supreme",
          message: "You sweat aioli. You ARE the aroma. Garlic flows through your soul."
        };
      } else if (score >= 18) {
        return {
          emoji: "🧄🧄",
          title: "Garlic Gladiator",
          message: "You carry garlic like a sword. Bold, proud, unapologetically seasoned."
        };
      } else if (score >= 10) {
        return {
          emoji: "🧄",
          title: "Mild Garlic Enthusiast",
          message: "You respect the bulb. Garlic is your sidekick, not your whole identity."
        };
      } else {
        return {
          emoji: "🌱",
          title: "Barely a Whiff",
          message: "Your garlic footprint is small. Vampires don't even flinch around you."
        };
      }
    }
  
    function getRandomGarlicQuote() {
      const randomIndex = Math.floor(Math.random() * garlicWisdoms.length);
      return garlicWisdoms[randomIndex];
    }
  
    function scrollToResult() {
      resultCard.classList.add("highlight");
      resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => resultCard.classList.remove("highlight"), 2000);
    }
  });
  
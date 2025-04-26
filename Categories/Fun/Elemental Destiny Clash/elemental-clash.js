// elemental-clash.js

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("clashForm");
    const resultCard = document.getElementById("resultCard");
    const resultText = document.getElementById("clashResult");
    const tryAgainBtn = document.getElementById("tryAgain");
  
    const elements = [
      "fire", "water", "earth", "air",
      "light", "darkness", "aether", "ice",
      "storm", "metal"
    ];
  
    const dominanceChart = {
      fire: ["ice", "metal", "air"],
      water: ["fire", "metal", "storm"],
      earth: ["water", "storm", "ice"],
      air: ["earth", "fire", "storm"],
      light: ["darkness", "storm", "ice"],
      darkness: ["light", "air", "metal"],
      aether: ["everything"], // beats all
      ice: ["air", "earth", "storm"],
      storm: ["fire", "air", "light"],
      metal: ["earth", "storm", "ice"]
    };
  
    const messages = {
      win: [
        "Your elemental spirit prevails effortlessly!",
        "You have tilted the cosmic balance in your favor.",
        "Your power shines supreme across the realms."
      ],
      lose: [
        "The forces overwhelm your essence... for now.",
        "Another element claims dominance, but the cycle turns.",
        "In this clash, the stars favor your challenger."
      ],
      tie: [
        "A perfect cosmic balance — neither dominates.",
        "You and your rival create a dance of equals.",
        "No victor emerges — the elements intertwine endlessly."
      ]
    };
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const userElement = document.getElementById("userElement").value;
      let challenger = elements[Math.floor(Math.random() * elements.length)];
  
      // Make sure challenger is not the same
      while (challenger === userElement) {
        challenger = elements[Math.floor(Math.random() * elements.length)];
      }
  
      const result = determineOutcome(userElement, challenger);
  
      let story = generateStory(userElement, challenger, result);
  
      resultText.innerHTML = story;
      resultCard.style.display = "block";
  
      highlightResult();
    });
  
    tryAgainBtn.addEventListener("click", () => {
      form.reset();
      resultCard.style.display = "none";
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  
    function determineOutcome(user, challenger) {
      if (dominanceChart[user].includes(challenger) || dominanceChart[user][0] === "everything") {
        return "win";
      } else if (dominanceChart[challenger].includes(user)) {
        return "lose";
      } else {
        return "tie";
      }
    }
  
    function generateStory(user, challenger, outcome) {
      const outcomeMessage = messages[outcome][Math.floor(Math.random() * messages[outcome].length)];
  
      const elementEmojis = {
        fire: "🔥",
        water: "💧",
        earth: "🌍",
        air: "🌬️",
        light: "✨",
        darkness: "🌑",
        aether: "🌌",
        ice: "🧊",
        storm: "🌩️",
        metal: "⚙️"
      };
  
      return `
        <p><strong>Your Element:</strong> ${elementEmojis[user]} ${capitalize(user)}</p>
        <p><strong>Challenger:</strong> ${elementEmojis[challenger]} ${capitalize(challenger)}</p>
        <p style="margin-top:1rem;"><em>${outcomeMessage}</em></p>
      `;
    }
  
    function capitalize(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
  
    function highlightResult() {
      resultCard.classList.add("glow");
      resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => {
        resultCard.classList.remove("glow");
      }, 2000);
    }
  });
  
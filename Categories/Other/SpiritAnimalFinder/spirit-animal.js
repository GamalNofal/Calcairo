document.addEventListener("DOMContentLoaded", () => {
    const nameInput = document.getElementById("nameInput");
    const resultBox = document.getElementById("resultBox");
    const resultCard = document.getElementById("resultCard");
    const generateBtn = document.getElementById("generateBtn");
  
    generateBtn.addEventListener("click", () => {
      const name = nameInput.value.trim();
      if (!name) {
        resultBox.innerHTML = "<p>Please enter a name to find your spirit animal.</p>";
        return;
      }
  
      const hash = hashCode(name.toLowerCase());
      const animal = pick(hash, animals);
      const emoji = pick(hash, emojis);
      const traits = pickThree(hash, traitsList);
  
      resultBox.innerHTML = `
        <span class="animal-emoji">${emoji}</span>
        <p><strong>Your Spirit Animal:</strong> ${animal}</p>
        <p><strong>Traits:</strong> ${traits.join(", ")}</p>
        <button class="cta-btn" id="tryAgainBtn" style="margin-top: 1.5rem;">🔄 Try Another Name</button>
      `;
  
      scrollToResult();
  
      setTimeout(() => {
        document.getElementById("tryAgainBtn").addEventListener("click", () => {
          nameInput.value = "";
          nameInput.focus();
          document.querySelector(".input-card").scrollIntoView({ behavior: "smooth", block: "center" });
        });
      }, 100);
    });
  
    function hashCode(str) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      return Math.abs(hash);
    }
  
    function pick(hash, array) {
      return array[hash % array.length];
    }
  
    function pickThree(hash, array) {
      const shuffled = array.slice().sort((a, b) => ((hash + a.length) % 11) - ((hash + b.length) % 7));
      return shuffled.slice(0, 3);
    }
  
    function scrollToResult() {
      resultCard.classList.add("highlight");
      resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => resultCard.classList.remove("highlight"), 2000);
    }
  
    const animals = [
      "Wolf", "Owl", "Bear", "Fox", "Eagle", "Tiger", "Dolphin", "Turtle",
      "Raven", "Panther", "Butterfly", "Horse", "Elephant", "Hawk", "Lion"
    ];
  
    const emojis = [
      "🐺", "🦉", "🐻", "🦊", "🦅", "🐯", "🐬", "🐢", "🦜", "🐆", "🦋", "🐎", "🐘", "🦅", "🦁"
    ];
  
    const traitsList = [
      "Wise", "Brave", "Mysterious", "Loyal", "Playful", "Strong",
      "Intuitive", "Gentle", "Quick", "Resilient", "Silent", "Curious",
      "Focused", "Independent", "Protective", "Creative", "Free-Spirited"
    ];
  });
  
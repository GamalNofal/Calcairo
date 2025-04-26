document.addEventListener("DOMContentLoaded", () => {
    const nameInput = document.getElementById("nameInput");
    const resultBox = document.getElementById("resultBox");
    const resultCard = document.getElementById("resultCard");
    const generateBtn = document.getElementById("generateBtn");
  
    generateBtn.addEventListener("click", () => {
      const name = nameInput.value.trim();
      if (!name) {
        resultBox.innerHTML = "<p>Please enter a name to generate your robot identity.</p>";
        return;
      }
  
      const hash = hashCode(name.toLowerCase());
      const code = generateRobotName(name);
      const emoji = pick(hash, emojis);
      const personality = pickThree(hash, traitsList);
  
      resultBox.innerHTML = `
        <span class="robot-icon">${emoji}</span>
        <p><strong>Model ID:</strong> ${code}</p>
        <p><strong>Core Traits:</strong> ${personality.join(", ")}</p>
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
  
    function generateRobotName(name) {
      const prefix = ["XR", "D3", "G7", "ZK", "Q5", "T1", "RA", "OM", "V9", "KX"];
      const suffix = ["AX", "47", "L0", "9Z", "77", "TR", "88", "X1", "QB", "22"];
      const nameHash = hashCode(name);
      const part1 = prefix[nameHash % prefix.length];
      const part2 = name.toUpperCase().slice(0, 2);
      const part3 = suffix[(nameHash + name.length) % suffix.length];
      return `${part1}-${part2}${part3}`;
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
  
    const emojis = ["🤖", "🦾", "🛸", "🔩", "📡", "⚙️", "💾", "🧠", "🚀", "👾"];
  
    const traitsList = [
      "Analytical", "Curious", "Adaptive", "Precise", "Logical", "Energetic",
      "Observant", "Efficient", "Strategic", "Independent", "Alert", "Loyal",
      "Calculating", "Inquisitive", "Fast-processing"
    ];
  });
  
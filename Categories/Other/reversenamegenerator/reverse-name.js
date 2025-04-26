document.addEventListener("DOMContentLoaded", () => {
    const nameInput = document.getElementById("nameInput");
    const resultBox = document.getElementById("resultBox");
    const resultCard = document.getElementById("resultCard");
    const generateBtn = document.getElementById("generateBtn");
  
    generateBtn.addEventListener("click", () => {
      const name = nameInput.value.trim();
      if (!name) {
        resultBox.innerHTML = "<p>Please enter a name to reveal its reverse form.</p>";
        return;
      }
  
      const reversed = name.split("").reverse().join("");
      const remix = remixName(reversed);
  
      resultBox.innerHTML = `
        <p><strong>Reversed Name:</strong> ${reversed}</p>
        <p><strong>Alien Remix:</strong> ${remix}</p>
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
  
    function remixName(name) {
      const suffixes = [" of Threx", " from Lunara", " of Kryon", " of the Void", " from Sector 7", " of Xebulon", " from Zaltor", " of Nebulix"];
      const prefix = ["X'", "Z'", "Dr.", "Lt. ", "Q'", "K'", "O'", "V'", "N'"];
      const hash = hashCode(name);
      const mix = `${prefix[hash % prefix.length]}${capitalize(name)}${suffixes[hash % suffixes.length]}`;
      return mix;
    }
  
    function hashCode(str) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      return Math.abs(hash);
    }
  
    function capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
  
    function scrollToResult() {
      resultCard.classList.add("highlight");
      resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => resultCard.classList.remove("highlight"), 2000);
    }
  });
  
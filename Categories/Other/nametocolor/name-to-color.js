document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("nameInput");
    const resultBox = document.getElementById("resultBox");
    const resultCard = document.getElementById("resultCard");
    const calculateBtn = document.getElementById("calculateBtn");
  
    calculateBtn.addEventListener("click", () => {
      const name = input.value.trim();
      if (!name) {
        resultBox.innerHTML = "<p>Please enter a name.</p>";
        return;
      }
  
      const hex = nameToHex(name);
      resultBox.innerHTML = `
        <p>The unique color for <strong>${name}</strong> is:</p>
        <p style="font-size: 1.4rem; font-weight: bold;">${hex}</p>
        <div class="color-preview" style="background: ${hex};"></div>
      `;
  
      scrollToResult();
    });
  
    function nameToHex(str) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
  
      let hex = '#';
      for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xFF;
        hex += ('00' + value.toString(16)).slice(-2);
      }
  
      return hex;
    }
  
    function scrollToResult() {
      resultCard.classList.add("highlight");
      resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => resultCard.classList.remove("highlight"), 2000);
    }
  });
  
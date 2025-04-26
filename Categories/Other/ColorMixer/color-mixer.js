document.addEventListener("DOMContentLoaded", () => {
    const color1 = document.getElementById("color1");
    const color2 = document.getElementById("color2");
    const resultBox = document.getElementById("resultBox");
    const resultCard = document.getElementById("resultCard");
    const mixBtn = document.getElementById("mixBtn");
  
    mixBtn.addEventListener("click", () => {
      const hex1 = color1.value;
      const hex2 = color2.value;
  
      const rgb1 = hexToRgb(hex1);
      const rgb2 = hexToRgb(hex2);
  
      const mixed = {
        r: Math.round((rgb1.r + rgb2.r) / 2),
        g: Math.round((rgb1.g + rgb2.g) / 2),
        b: Math.round((rgb1.b + rgb2.b) / 2)
      };
  
      const mixedHex = rgbToHex(mixed.r, mixed.g, mixed.b);
  
      resultBox.innerHTML = `
        <p>🎨 Mixed Color Result:</p>
        <p style="font-size: 1.4rem; font-weight: bold;">${mixedHex}</p>
        <div class="color-preview" style="background-color: ${mixedHex};"></div>
      `;
  
      scrollToResult();
    });
  
    function hexToRgb(hex) {
      const bigint = parseInt(hex.slice(1), 16);
      return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255
      };
    }
  
    function rgbToHex(r, g, b) {
      return (
        "#" +
        [r, g, b]
          .map((x) => {
            const hex = x.toString(16);
            return hex.length === 1 ? "0" + hex : hex;
          })
          .join("")
      );
    }
  
    function scrollToResult() {
      resultCard.classList.add("highlight");
      resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => resultCard.classList.remove("highlight"), 2000);
    }
  });
  
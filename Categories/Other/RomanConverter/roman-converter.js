document.addEventListener("DOMContentLoaded", () => {
    const numberInput = document.getElementById("numberInput");
    const romanInput = document.getElementById("romanInput");
    const resultBox = document.getElementById("resultBox");
    const resultCard = document.getElementById("resultCard");
    const convertBtn = document.getElementById("convertBtn");
  
    convertBtn.addEventListener("click", () => {
      const numValue = parseInt(numberInput.value.trim());
      const romanValue = romanInput.value.trim().toUpperCase();
  
      let result = "";
  
      if (numValue && numValue >= 1 && numValue <= 3999) {
        result = `<strong>${numValue}</strong> in Roman numerals is <strong>${toRoman(numValue)}</strong>`;
      } else if (romanValue && isValidRoman(romanValue)) {
        result = `<strong>${romanValue}</strong> equals <strong>${fromRoman(romanValue)}</strong>`;
      } else {
        result = "Please enter a valid number (1–3999) or Roman numeral (I–MMMCMXCIX).";
      }
  
      resultBox.innerHTML = `<p>${result}</p>`;
      scrollToResult();
    });
  
    function toRoman(num) {
      const lookup = {
        M: 1000, CM: 900, D: 500, CD: 400,
        C: 100, XC: 90, L: 50, XL: 40,
        X: 10, IX: 9, V: 5, IV: 4, I: 1
      };
      let roman = "";
      for (let key in lookup) {
        while (num >= lookup[key]) {
          roman += key;
          num -= lookup[key];
        }
      }
      return roman;
    }
  
    function fromRoman(str) {
      const map = {
        I: 1, V: 5, X: 10, L: 50,
        C: 100, D: 500, M: 1000
      };
      let total = 0;
      for (let i = 0; i < str.length; i++) {
        const current = map[str[i]];
        const next = map[str[i + 1]];
        if (next > current) {
          total += next - current;
          i++;
        } else {
          total += current;
        }
      }
      return total;
    }
  
    function isValidRoman(str) {
      return /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/.test(str);
    }
  
    function scrollToResult() {
      resultCard.classList.add("highlight");
      resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => resultCard.classList.remove("highlight"), 2000);
    }
  });
  
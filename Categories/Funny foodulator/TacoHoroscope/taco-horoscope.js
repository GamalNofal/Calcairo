document.addEventListener("DOMContentLoaded", () => {
    const signSelect = document.getElementById("zodiacSign");
    const resultBox = document.getElementById("resultBox");
    const resultCard = document.getElementById("resultCard");
    const generateBtn = document.getElementById("generateBtn");
  
    generateBtn.addEventListener("click", () => {
      const sign = signSelect.value;
  
      if (!sign) {
        resultBox.innerHTML = "<p>Please select your zodiac sign to get your taco prophecy.</p>";
        return;
      }
  
      const taco = tacoSigns[sign.toLowerCase()];
      resultBox.innerHTML = `
        <p style="font-size: 2rem;">${taco.emoji}</p>
        <p><strong>Your Taco Spirit:</strong> ${taco.name}</p>
        <p><em>${taco.description}</em></p>
        <p><strong>Taco Horoscope:</strong> ${taco.horoscope}</p>
      `;
  
      scrollToResult();
    });
  
    function scrollToResult() {
      resultCard.classList.add("highlight");
      resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => resultCard.classList.remove("highlight"), 2000);
    }
  
    const tacoSigns = {
      aries: {
        emoji: "🌮🔥",
        name: "Spicy Beef Taco",
        description: "Bold, fiery, and ready to charge into flavor.",
        horoscope: "Today’s the day to add hot sauce — figuratively and literally. Take risks. Salsa on the side."
      },
      taurus: {
        emoji: "🌮🐄",
        name: "Cheesy Ground Beef Taco",
        description: "Comforting, dependable, and extra cheesy.",
        horoscope: "Stick to what you love today, and maybe treat yourself to seconds. You're worth the calories."
      },
      gemini: {
        emoji: "🌮🌪️",
        name: "Split Personality Taco",
        description: "Two fillings, one taco. Chaotic genius.",
        horoscope: "Expect changes — and try not to spill your fillings when it happens. Stay crunchy."
      },
      cancer: {
        emoji: "🌮🧀",
        name: "Soft Shell Bean Taco",
        description: "Warm, sensitive, a little messy but full of love.",
        horoscope: "Someone needs your emotional salsa today. Don't be afraid to open your shell."
      },
      leo: {
        emoji: "🌮👑",
        name: "Golden Chicken Taco",
        description: "Flashy, fierce, and photogenic.",
        horoscope: "You are the star of this fiesta. Say yes to the lime and bask in the guac-light."
      },
      virgo: {
        emoji: "🌮📏",
        name: "Perfectly Layered Vegan Taco",
        description: "Organized, detailed, and oh-so nutritious.",
        horoscope: "Everything will click into place — as long as you don’t overthink your toppings."
      },
      libra: {
        emoji: "🌮⚖️",
        name: "Balanced Fish Taco",
        description: "Elegant, harmonious, and served with a lemon wedge.",
        horoscope: "Keep things light and fresh today — avoid drama and extra sour cream."
      },
      scorpio: {
        emoji: "🌮🦂",
        name: "Mystery Meat Taco",
        description: "Dark, intense, and dangerously flavorful.",
        horoscope: "Someone's about to get burned. Make sure it's not your tortilla. Watch for secrets."
      },
      sagittarius: {
        emoji: "🌮🏹",
        name: "Adventure Taco Supreme",
        description: "Wild, curious, and full of flavor.",
        horoscope: "Try a new seasoning today. Bold moves = big taste."
      },
      capricorn: {
        emoji: "🌮💼",
        name: "No-Nonsense Steak Taco",
        description: "Serious, structured, and always satisfying.",
        horoscope: "Focus is your best friend today. Lettuce not be distracted by side sauces."
      },
      aquarius: {
        emoji: "🌮🚀",
        name: "Alien Sauced Taco",
        description: "Weird, futuristic, and somehow amazing.",
        horoscope: "You're thinking outside the tortilla — and it’s working. Don’t explain it. Just eat it."
      },
      pisces: {
        emoji: "🌮🌊",
        name: "Dreamy Shrimp Taco",
        description: "Soft, flowing, and slightly citrusy.",
        horoscope: "Go with the flow — but don’t forget the lime. Daydreaming is your superpower today."
      }
    };
  });
  
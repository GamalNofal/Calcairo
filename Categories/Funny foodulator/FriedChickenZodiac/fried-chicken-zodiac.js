document.addEventListener("DOMContentLoaded", () => {
    const signSelect = document.getElementById("zodiacSign");
    const resultBox = document.getElementById("resultBox");
    const resultCard = document.getElementById("resultCard");
    const generateBtn = document.getElementById("generateBtn");
  
    generateBtn.addEventListener("click", () => {
      const sign = signSelect.value;
  
      if (!sign) {
        resultBox.innerHTML = "<p>Please select your zodiac sign to reveal your crispy destiny.</p>";
        return;
      }
  
      const chicken = chickenZodiac[sign.toLowerCase()];
      resultBox.innerHTML = `
        <p style="font-size: 2rem;">${chicken.emoji}</p>
        <p><strong>Your Fried Chicken Style:</strong> ${chicken.name}</p>
        <p><em>${chicken.description}</em></p>
        <p style="margin-top: 1rem; font-style: italic;">${chicken.wisdom}</p>
      `;
  
      scrollToResult();
    });
  
    function scrollToResult() {
      resultCard.classList.add("highlight");
      resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => resultCard.classList.remove("highlight"), 2000);
    }
  
    const chickenZodiac = {
      aries: {
        emoji: "🔥🍗",
        name: "Hot Nashville Drumstick",
        description: "Bold, spicy, and never afraid to dive in first.",
        wisdom: "When life gets hot, you turn up the flavor. You don’t chase sauce — you ARE the sauce."
      },
      taurus: {
        emoji: "🧈🍗",
        name: "Buttermilk Biscuit Tender",
        description: "Comfort-loving, dependable, and rich in tradition.",
        wisdom: "Slow-cooked patience. You bring the side dishes and the emotional support."
      },
      gemini: {
        emoji: "💬🍗",
        name: "Double-Dip Wing Duo",
        description: "Social, curious, and often unpredictable.",
        wisdom: "You're sweet and spicy — sometimes in the same bite. Talk fast. Eat faster."
      },
      cancer: {
        emoji: "🧄🍗",
        name: "Garlic-Lover's Breast",
        description: "Emotional, nurturing, and full of secret flavor.",
        wisdom: "You marinate in your moods — but always feed everyone first."
      },
      leo: {
        emoji: "🌟🍗",
        name: "Golden Crowned Wing",
        description: "Flashy, loud, and unforgettably delicious.",
        wisdom: "You belong on a platter — front and center. Never let them dull your crunch."
      },
      virgo: {
        emoji: "📏🍗",
        name: "Precision-Cut Boneless Strip",
        description: "Organized, thoughtful, and seasoned with purpose.",
        wisdom: "Perfectly portioned, meticulously fried. You ARE the standard."
      },
      libra: {
        emoji: "⚖️🍗",
        name: "Balanced Honey-Dipped Thigh",
        description: "Elegant, diplomatic, and sweet with a little heat.",
        wisdom: "You bring the harmony — and the napkins. Never sticky, always smooth."
      },
      scorpio: {
        emoji: "🦂🍗",
        name: "Dark Magic Cajun Wing",
        description: "Intense, mysterious, and slightly dangerous.",
        wisdom: "You're coated in mystery and dipped in secrets. Handle with gloves."
      },
      sagittarius: {
        emoji: "🎯🍗",
        name: "Wildfire Jalapeño Nugget",
        description: "Free-spirited, funny, and always a little extra.",
        wisdom: "Rules? You deep-fry them. And serve with extra ranch."
      },
      capricorn: {
        emoji: "🏆🍗",
        name: "Old-School Crispy Classic",
        description: "Ambitious, reliable, and expertly seasoned.",
        wisdom: "You’ve got high standards — and a breadcrumb trail to prove it."
      },
      aquarius: {
        emoji: "🚀🍗",
        name: "Cosmic Cornflake Crunch",
        description: "Innovative, unpredictable, and from another kitchen.",
        wisdom: "You don't follow recipes. You invent them. Sometimes edible, always iconic."
      },
      pisces: {
        emoji: "🌊🍗",
        name: "Sweet Chili Tenderheart",
        description: "Dreamy, soft-shelled, and a little drippy.",
        wisdom: "Your flavor floats through dreams. Tender but never bland."
      }
    };
  });
  
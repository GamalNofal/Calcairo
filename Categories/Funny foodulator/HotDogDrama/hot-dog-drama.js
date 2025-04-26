document.addEventListener("DOMContentLoaded", () => {
    const role = document.getElementById("role");
    const reaction = document.getElementById("reaction");
    const condiment = document.getElementById("condiment");
    const resultBox = document.getElementById("resultBox");
    const resultCard = document.getElementById("resultCard");
    const generateBtn = document.getElementById("generateBtn");
  
    const dramaProfiles = [
      {
        name: "Exploding Relish Missile",
        emoji: "💥🌭",
        minScore: 85,
        message: "You bring full chaos to the cookout. You once rage-quit a BBQ and took the buns with you."
      },
      {
        name: "Overstuffed Chili Crisis",
        emoji: "🌶️😱",
        minScore: 70,
        message: "You’re intense, messy, and unforgettable. Your drama stains shirts *and* souls."
      },
      {
        name: "Passive Mustard Drizzle",
        emoji: "😐🌭",
        minScore: 50,
        message: "You don’t yell — you judge. Your glare is stronger than Sriracha."
      },
      {
        name: "Mayo Chill Classic",
        emoji: "🧊🌭",
        minScore: 30,
        message: "Unbothered. Unshaken. Slightly slippery under pressure, but you play it cool."
      },
      {
        name: "Dry Bun Ghoster",
        emoji: "👻🍞",
        minScore: 0,
        message: "You bring no toppings. You disappear during cleanup. The quietest drama of all."
      }
    ];
  
    const condimentBonus = {
      mustard: 5,
      ketchup: 10,
      relish: 15,
      sriracha: 20,
      mayo: -5
    };
  
    const wisdoms = [
      "Let the grill cool before you pop off.",
      "Some hot dogs need space. Others need ketchup therapy.",
      "Not all drama is bad. Just don’t burn the buns.",
      "Your spice level is felt in three counties.",
      "BBQ wisdom: Always bring snacks *and* emotional boundaries.",
      "You're the reason the grillmaster retired.",
      "Some people are buns. You? You’re the heat."
    ];
  
    generateBtn.addEventListener("click", () => {
      const roleVal = role.value;
      const reactionVal = parseInt(reaction.value);
      const condimentVal = condiment.value;
  
      let baseScore = reactionVal * 10;
  
      // Role bonus
      if (roleVal === "firestarter") baseScore += 15;
      else if (roleVal === "comedian") baseScore += 10;
      else if (roleVal === "leader") baseScore += 5;
      else if (roleVal === "observer") baseScore -= 5;
      else if (roleVal === "mystery") baseScore += 8;
  
      // Condiment bonus
      baseScore += condimentBonus[condimentVal] || 0;
  
      const score = Math.min(100, baseScore);
  
      const match = dramaProfiles.find(profile => score >= profile.minScore);
      const wisdom = wisdoms[Math.floor(Math.random() * wisdoms.length)];
  
      resultBox.innerHTML = `
        <p style="font-size: 2rem;">${match.emoji}</p>
        <p><strong>Drama Index:</strong> ${score}%</p>
        <p><strong>You Are:</strong> ${match.name}</p>
        <p><em>${match.message}</em></p>
        <p style="margin-top: 1rem; font-style: italic;">🌭 ${wisdom}</p>
      `;
  
      scrollToResult();
    });
  
    function scrollToResult() {
      resultCard.classList.add("highlight");
      resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => resultCard.classList.remove("highlight"), 2000);
    }
  });
  
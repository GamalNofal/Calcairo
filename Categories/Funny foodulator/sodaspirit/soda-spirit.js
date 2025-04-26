document.addEventListener("DOMContentLoaded", () => {
    const nameInput = document.getElementById("nameInput");
    const resultBox = document.getElementById("resultBox");
    const resultCard = document.getElementById("resultCard");
    const generateBtn = document.getElementById("generateBtn");
  
    generateBtn.addEventListener("click", () => {
      const name = nameInput.value.trim();
      if (!name) {
        resultBox.innerHTML = "<p>Please enter your name to discover your soda spirit.</p>";
        return;
      }
  
      const sodaProfile = getSodaSpirit(name);
      resultBox.innerHTML = `
        <p style="font-size: 2rem;">${sodaProfile.emoji}</p>
        <p><strong>Your Soda Spirit:</strong> ${sodaProfile.name}</p>
        <p><em>${sodaProfile.description}</em></p>
        <button class="cta-btn" id="tryAgainBtn" style="margin-top: 1.5rem;">🔄 Try Another Name</button>
      `;
  
      scrollToResult();
  
      setTimeout(() => {
        document.getElementById("tryAgainBtn").addEventListener("click", () => {
          nameInput.value = "";
          nameInput.focus();
          document.querySelector(".input-card").scrollIntoView({ behavior: "smooth", block: "center" });
        });
        const surpriseBtn = document.createElement("button");
        surpriseBtn.textContent = "🔁 Surprise Me Again";
        surpriseBtn.className = "cta-btn";
        surpriseBtn.style.marginTop = "1rem";
        surpriseBtn.addEventListener("click", () => {
          const randomSoda = sodas[Math.floor(Math.random() * sodas.length)];
          resultBox.innerHTML = `
            <p style="font-size: 2rem;">${randomSoda.emoji}</p>
            <p><strong>Your Soda Spirit:</strong> ${randomSoda.name}</p>
            <p><em>${randomSoda.description}</em></p>
            <button class="cta-btn" id="tryAgainBtn" style="margin-top: 1.5rem;">🔄 Try Another Name</button>
          `;
          scrollToResult();
        });
      
        resultBox.appendChild(surpriseBtn);
      }, 100);
    });
  
    function getSodaSpirit(name) {
      const hash = hashCode(name.toLowerCase());
      return sodas[hash % sodas.length];
    }
  
    function hashCode(str) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      return Math.abs(hash);
    }
  
    function scrollToResult() {
      resultCard.classList.add("highlight");
      resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => resultCard.classList.remove("highlight"), 2000);
    }
  
    const sodas = [
      { emoji: "🥤", name: "Classic Cola", description: "Reliable, bold, and always in style." },
      { emoji: "🍊", name: "Orange Zing", description: "Bubbly and bright with an infectious laugh." },
      { emoji: "🍇", name: "Grape Haze", description: "Creative, dreamy, and a little mysterious." },
      { emoji: "🍓", name: "Strawberry Pop", description: "Sweet, charming, and totally huggable." },
      { emoji: "🍋", name: "Lemon Blaster", description: "Sharp, focused, and zesty." },
      { emoji: "🌊", name: "Ocean Splash", description: "Calm, deep thinker with refreshing vibes." },
      { emoji: "☠️", name: "Caffeinated Chaos", description: "Explosive energy. May cause giggling." },
      { emoji: "🔥", name: "Ginger Blast", description: "Fiery, chaotic, and unforgettable." },
      { emoji: "🧊", name: "Frozen Grape", description: "Chill, laid-back, a little cold — in a cool way." },
      { emoji: "💥", name: "Citrus Surge", description: "Loud, fun, and full of life." },
      { emoji: "🦄", name: "Unicorn Fizz", description: "Whimsical, rare, and sparkly inside." },
      { emoji: "🌈", name: "Rainbow Cola", description: "Inclusive, stylish, and full of flavor." },
      { emoji: "🪐", name: "Galactic Grape", description: "Out of this world and a bit cosmic." },
      { emoji: "🦖", name: "Dino Soda", description: "Ancient vibes. Stomp the system." },
      { emoji: "👻", name: "Phantom Lime", description: "Quiet, spooky, and weirdly loveable." },
      { emoji: "🍫", name: "Choco-Cola", description: "Sweet with a surprise punch." },
      { emoji: "🧃", name: "Fruit Punch Fizz", description: "Colorful chaos. Very social." },
      { emoji: "🌋", name: "Volcano Pop", description: "One word: BOOM." },
      { emoji: "🦋", name: "Butterfly Bubbles", description: "Gentle, fluttery, unpredictable joy." },
      { emoji: "👑", name: "Royal Root Beer", description: "Classic vibes. Deep thoughts. Very regal." },
      { emoji: "💚", name: "Matcha Fizz", description: "Calm, zen, earthy soul with sparkle." },
      { emoji: "💎", name: "Crystal Cola", description: "Elegant. Rare. Transparent and wise." },
      { emoji: "🫧", name: "Bubble Breeze", description: "Happy, floaty, full of light energy." },
      { emoji: "🎩", name: "Gentleman Grape", description: "Old school style. Smooth talker." },
      { emoji: "🌵", name: "Cactus Cooler", description: "Rare, refreshing, stings a little." },
      { emoji: "🐍", name: "Venom Soda", description: "Sharp tongue. Surprisingly sweet later." },
      { emoji: "🛸", name: "Alien Ade", description: "You’re not from here, are you?" },
      { emoji: "🧠", name: "Thinker Tonic", description: "Smart, deep, tastes like ambition." },
      { emoji: "🍒", name: "Cherry Charge", description: "Bright, bold, and dangerously charming." },
      { emoji: "🕶️", name: "Cool Cola", description: "Too chill for this planet." },
      { emoji: "🎉", name: "Party Popper", description: "Wherever you go, the vibe follows." },
      { emoji: "🪄", name: "Mystic Mint", description: "Fresh, strange, totally unpredictable." },
      { emoji: "🚀", name: "Rocket Fizz", description: "Zero to party in 3 seconds flat." },
      { emoji: "🎭", name: "Drama Dew", description: "So extra. We love it anyway." },
      { emoji: "🧄", name: "Garlic Gulp", description: "What? You’re just... intense." },
      { emoji: "📀", name: "Retro Cola", description: "Vintage soul with modern sparkle." },
      { emoji: "🐝", name: "Honey Buzz", description: "Sweet. Sticky. You get stuff done." },
      { emoji: "🧚", name: "Fae Fizz", description: "Glowy, flirty, magical energy." },
      { emoji: "💤", name: "Nap Nectar", description: "Soft, sleepy, and probably introverted." },
      { emoji: "🍵", name: "Sparkling Matcha", description: "Cool wisdom in a bubbly package." },
      { emoji: "🎧", name: "Lo-Fi Lime", description: "Low-key but fresh AF." },
      { emoji: "🌀", name: "Tornado Tonic", description: "Spins fast. Never boring." },
      { emoji: "🧊", name: "Zero Chill", description: "Cold but iconic." },
      { emoji: "🐲", name: "Dragon Dew", description: "Rare, bold, and a little mythical." },
      { emoji: "📚", name: "Study Soda", description: "Quiet fizz. High caffeine. Big ideas." },
      { emoji: "🧟", name: "Zombie Zing", description: "Strangely loyal. Very undead." },
      { emoji: "🐸", name: "Frog Pop", description: "Bouncy energy. Unexpected hero." },
      { emoji: "🪙", name: "Copper Cola", description: "Retro-funky. Niche legend." },
      { emoji: "🧥", name: "Mysterious Mango", description: "Smooth. Hidden depth. Smells like intrigue." }
    ];
  });
  
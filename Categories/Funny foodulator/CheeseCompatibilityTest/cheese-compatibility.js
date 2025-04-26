document.addEventListener("DOMContentLoaded", () => {
    const name1Input = document.getElementById("name1");
    const name2Input = document.getElementById("name2");
    const vibeSelect = document.getElementById("vibe");
    const resultBox = document.getElementById("resultBox");
    const resultCard = document.getElementById("resultCard");
    const calculateBtn = document.getElementById("calculateBtn");
  
    const cheeses = {
      sweet: [
        { name: "Brie Bliss", emoji: "🧀❤️", description: "Soft, warm, and elegant — a buttery love story." },
        { name: "Cream Cheese Cuties", emoji: "🥯💕", description: "Comforting and always spreadable — you go with everything." },
        { name: "Mozzarella Moments", emoji: "🍕🧡", description: "Stretchy, cheesy, and oh-so-huggy." }
      ],
      salty: [
        { name: "Feta Frenzy", emoji: "🌊🧀", description: "Crumbly but lovable — together you're a bold bite." },
        { name: "Halloumi Heat", emoji: "🔥🧀", description: "You sizzle under pressure, but bounce back stronger." },
        { name: "Parmesan Pals", emoji: "🧂💚", description: "Aged and sharp, but loyal ‘til the end of the pasta." }
      ],
      spicy: [
        { name: "Pepper Jack Passion", emoji: "🌶️🧀", description: "Fiery, chaotic, and totally addictive." },
        { name: "Jalapeño Havarti", emoji: "🌶️💥", description: "Mild one moment, explosive the next — drama in dairy form." },
        { name: "Ghost Pepper Gouda", emoji: "👻🔥", description: "You're dangerously cheesy — and proud of it." }
      ],
      mature: [
        { name: "Aged Gouda Duo", emoji: "🍷🧀", description: "Complex, refined, and deeply satisfying — you’ve aged like cheese." },
        { name: "Gruyère Goals", emoji: "📚🧀", description: "Mature, melty, and made for deep dish discussions." },
        { name: "Blue Cheese Bond", emoji: "💙🧀", description: "Funky, misunderstood, but rich in love." }
      ],
      weird: [
        { name: "Cheese Curd Chaos", emoji: "🌀🧀", description: "Squeaky and unpredictable, but impossible to ignore." },
        { name: "String Cheese Twosome", emoji: "🧵💛", description: "Pull-apart personalities — but always end up in a hug." },
        { name: "Limburger Lovers", emoji: "😳🧀", description: "Not for everyone… but somehow, you just work." }
      ]
    };
  
    const wisdoms = [
      "You two are aged to perfection.",
      "Love this melty is rare.",
      "Your relationship smells stronger with time.",
      "You’re dangerously spreadable together.",
      "Some pairs are made in heaven — others in a cheese cellar.",
      "You might crumble, but you still belong on the same salad.",
      "You're grilled cheese soulmates.",
      "You clash, you melt, you reform — just like nachos.",
      "Lactose may be optional. Your love? Never.",
      "The rind means nothing. It’s what’s inside that counts."
    ];
  
    calculateBtn.addEventListener("click", () => {
      const name1 = name1Input.value.trim();
      const name2 = name2Input.value.trim();
      const vibe = vibeSelect.value;
  
      if (!name1 || !name2 || !vibe) {
        resultBox.innerHTML = "<p>Please enter both names and choose a vibe.</p>";
        return;
      }
  
      const seed = hashNames(name1, name2);
      const match = getCheeseMatch(vibe, seed);
      const compatibility = 60 + (seed % 41); // Range: 60–100%
      const message = wisdoms[seed % wisdoms.length];
  
      resultBox.innerHTML = `
        <p style="font-size: 2rem;">${match.emoji}</p>
        <p><strong>Your Match:</strong> ${match.name}</p>
        <p><em>${match.description}</em></p>
        <p><strong>Compatibility:</strong> ${compatibility}%</p>
        <p style="margin-top: 1rem; font-style: italic;">🧀 ${message}</p>
      `;
  
      scrollToResult();
    });
  
    function getCheeseMatch(vibe, seed) {
      const list = cheeses[vibe];
      return list[seed % list.length];
    }
  
    function hashNames(name1, name2) {
      const combined = (name1 + name2).toLowerCase();
      let hash = 0;
      for (let i = 0; i < combined.length; i++) {
        hash += combined.charCodeAt(i) * (i + 1);
      }
      return hash;
    }
  
    function scrollToResult() {
      resultCard.classList.add("highlight");
      resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => resultCard.classList.remove("highlight"), 2000);
    }
  });
  
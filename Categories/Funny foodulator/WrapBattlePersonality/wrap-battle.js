document.addEventListener("DOMContentLoaded", () => {
    const moodSelect = document.getElementById("mood");
    const resultBox = document.getElementById("resultBox");
    const resultCard = document.getElementById("resultCard");
    const generateBtn = document.getElementById("generateBtn");
  
    const wrapProfiles = {
      calm: [
        {
          name: "Lettuce Wrap of Zen",
          emoji: "🥬😌",
          description: "Crisp, light, and centered. Nothing sticks to you — not even drama."
        },
        {
          name: "Hummus Hug Wrap",
          emoji: "🫓🧘‍♀️",
          description: "You're gentle, smooth, and always grounding. A go-to in any chill moment."
        },
        {
          name: "Cucumber Cool Wrap",
          emoji: "🥒🌯",
          description: "You stay fresh under pressure. Everyone loves you in summer."
        }
      ],
      bold: [
        {
          name: "Flamin’ Burrito Boss",
          emoji: "🌶️🌯🔥",
          description: "Loud, stuffed with ambition, and always rolling into chaos with style."
        },
        {
          name: "Sriracha Salsa Crunchwrap",
          emoji: "🌮💥",
          description: "You make an entrance and leave a trail of spicy quotes behind."
        },
        {
          name: "Triple Cheese Explosion Wrap",
          emoji: "🧀🧀🧀",
          description: "You're extra, loud, and everyone secretly loves it."
        }
      ],
      focused: [
        {
          name: "Mission Control Shawarma",
          emoji: "🚀🥙",
          description: "No fluff, just flavor. You're efficient, productive, and wrapped for success."
        },
        {
          name: "Spinach-Packed Power Wrap",
          emoji: "🧠🥬",
          description: "Nutrient-dense and goal-oriented. You meal prep your future."
        },
        {
          name: "Kale Accountant Wrap",
          emoji: "📊🌯",
          description: "Clean, structured, and budgeted. No spill zones. No missed meetings."
        }
      ],
      weird: [
        {
          name: "Pickle Peanut Butter Roll-Up",
          emoji: "🥒🥜😜",
          description: "No one understands you, but they keep coming back for more."
        },
        {
          name: "Mystery Bagel Wrap",
          emoji: "❓🥯",
          description: "You’re the wildcard with unexpected fillings and cult status."
        },
        {
          name: "Fruity Pita Surprise",
          emoji: "🍍🌯🎉",
          description: "Tropical? Toasted? Tart? You defy description and that’s your brand."
        }
      ],
      cozy: [
        {
          name: "Mac 'n Cheese Blanket Wrap",
          emoji: "🧶🧀",
          description: "Soft, melty, and comforting. You are the emotional support wrap."
        },
        {
          name: "Grilled Blanket Burrito",
          emoji: "🌯🛋️",
          description: "Toasty, warm, and made for nights in. You bring the comfort and carbs."
        },
        {
          name: "Soup-Inspired Snuggle Wrap",
          emoji: "🥣💤",
          description: "You’re a hug in tortilla form. Nap-friendly. Sniffle-approved."
        }
      ]
    };
  
    const wisdoms = [
      "Sometimes life just needs an extra sauce packet.",
      "Roll with it — you’re already wrapped for greatness.",
      "Keep it tight. No one needs emotional leaks.",
      "You bring the guac. That’s enough.",
      "Balance your ingredients — and your boundaries.",
      "You're spicy on the outside, soft on the inside.",
      "Even the best wraps fall apart sometimes. Re-roll.",
      "Being wrapped weird just means you’re layered.",
      "Hot sauce heals more than time ever could.",
      "Never apologize for your filling."
    ];
  
    generateBtn.addEventListener("click", () => {
      const mood = moodSelect.value;
  
      if (!mood) {
        resultBox.innerHTML = "<p>Please select your daily energy.</p>";
        return;
      }
  
      const options = wrapProfiles[mood];
      const selected = options[Math.floor(Math.random() * options.length)];
      const advice = wisdoms[Math.floor(Math.random() * wisdoms.length)];
  
      resultBox.innerHTML = `
        <p style="font-size: 2rem;">${selected.emoji}</p>
        <p><strong>You Are:</strong> ${selected.name}</p>
        <p><em>${selected.description}</em></p>
        <p style="margin-top: 1rem; font-style: italic;">🌯 ${advice}</p>
      `;
  
      scrollToResult();
    });
  
    function scrollToResult() {
      resultCard.classList.add("highlight");
      resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => resultCard.classList.remove("highlight"), 2000);
    }
  });
  
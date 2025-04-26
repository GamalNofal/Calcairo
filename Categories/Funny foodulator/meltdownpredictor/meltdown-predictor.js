document.addEventListener("DOMContentLoaded", () => {
    const angerType = document.getElementById("angerType");
    const meltdownLevel = document.getElementById("meltdownLevel");
    const resultBox = document.getElementById("resultBox");
    const resultCard = document.getElementById("resultCard");
    const generateBtn = document.getElementById("generateBtn");
  
    generateBtn.addEventListener("click", () => {
      const mood = angerType.value;
      const level = parseInt(meltdownLevel.value);
  
      if (!mood || isNaN(level)) {
        resultBox.innerHTML = "<p>Please pick your anger type and meltdown level.</p>";
        return;
      }
  
      const foodMatch = getMeltdownFood(mood, level);
      resultBox.innerHTML = `
        <p style="font-size: 2rem;">${foodMatch.emoji}</p>
        <p><strong>You Are:</strong> ${foodMatch.name}</p>
        <p><em>${foodMatch.description}</em></p>
        <p style="margin-top: 1rem; font-style: italic;">💥 ${getMeltdownWisdom()}</p>
      `;
  
      scrollToResult();
    });
  
    function scrollToResult() {
      resultCard.classList.add("highlight");
      resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => resultCard.classList.remove("highlight"), 2000);
    }
  
    function getMeltdownFood(mood, level) {
      const allFoods = [
        {
          mood: "silent",
          emoji: "🧊🍦",
          name: "Silent Ice Cream Cone",
          description: "You freeze everything out. Calm on the outside, melting on the inside."
        },
        {
          mood: "silent",
          emoji: "🥶🍣",
          name: "Passive Sushi Revenge",
          description: "Cold, quiet, and deadly with wasabi precision."
        },
        {
          mood: "verbal",
          emoji: "🌶️🌮",
          name: "Spicy Rant Taco",
          description: "You explode in a flavorful burst. Everyone feels the heat."
        },
        {
          mood: "verbal",
          emoji: "🔥🍝",
          name: "Screaming Spaghetti",
          description: "Wild, tangled, saucy. The louder, the messier."
        },
        {
          mood: "passive",
          emoji: "😐🍪",
          name: "Cold Cookie Stare",
          description: "You serve icy silence and judgement... with sprinkles."
        },
        {
          mood: "passive",
          emoji: "🍞📦",
          name: "Bread Left in the Mailbox",
          description: "You do weird things when mad. You're oddly powerful."
        },
        {
          mood: "explode",
          emoji: "💥🍕",
          name: "Exploding Microwave Pizza",
          description: "One wrong beep and you’re done. Cheesy fury everywhere."
        },
        {
          mood: "explode",
          emoji: "🤬🍜",
          name: "Boiling Ramen Rage",
          description: "Sizzling, steaming, bubbling fury with a noodle slap."
        },
        {
          mood: "silent",
          emoji: "🙄🥬",
          name: "Judgy Kale Chip",
          description: "No yelling, just withering leafy glares and crunching disappointment."
        },
        {
          mood: "verbal",
          emoji: "🗯️🍗",
          name: "Yelling Fried Chicken",
          description: "Crispy, loud, and dangerous to handle."
        },
        {
          mood: "passive",
          emoji: "💅🍩",
          name: "Sassy Glazed Donut",
          description: "You toss shade, not fists. But it's sticky sweet sass."
        },
        {
          mood: "explode",
          emoji: "🧨🍖",
          name: "BBQ Blast-Off Rib",
          description: "Kaboom! You blow up then fall asleep. Still tasty tho."
        }
      ];
  
      // Filter foods by mood
      const options = allFoods.filter(f => f.mood === mood);
  
      // Choose based on level (rotate variety)
      const index = level % options.length;
      return options[index];
    }
  
    function getMeltdownWisdom() {
      const quotes = [
        "Microwave revenge is best served cold.",
        "You can't fix everything with fries... but you can try.",
        "Let it simmer. Don't let it burn the pan.",
        "Eat feelings responsibly.",
        "Throwing food doesn't solve problems, but it makes a statement.",
        "Everyone has a boiling point. Yours comes with cheese.",
        "Next time, breathe in garlic bread. Breathe out sarcasm.",
        "Sometimes your rage is spicy enough to season a stew.",
        "Don't bottle it up — unless it's hot sauce.",
        "Even ketchup snaps sometimes."
      ];
      return quotes[Math.floor(Math.random() * quotes.length)];
    }
  });
  
document.addEventListener("DOMContentLoaded", function () {
  const revealBtn = document.getElementById("revealBtn");
  const fortuneBox = document.getElementById("fortuneBox");

  const fortunes = [
    "You are the main character in a magical story. Keep going! 📖",
    "Good energy is coming your way. Accept it with gratitude 🌈",
    "The stars say: nap first, conquer later 🌙",
    "You’ll receive a sign today — don’t ignore it 👀",
    "Your smile is a spell. Use it wisely ✨",
    "Unexpected joy is about to knock. Let it in 🎁",
    "You have more power than you believe. Trust yourself 🧙",
    "Today, you sparkle extra. Don’t dim for anyone 💫",
    "A beautiful surprise is brewing just for you 🌸",
    "Your future is shaped by magic and boldness 🔥",
    "The universe is on your team. Play boldly 🌍",
    "Your dreams are calling. Time to answer 📞",
    "A small step today leads to big magic tomorrow 🪄",
    "Someone is thinking kind thoughts of you right now 💌",
    "Patience is your hidden wand — use it today 🕰️",
    "Luck is being sprinkled on your path. Watch for glitter ✨",
    "The next chapter of your story will be your favorite one 📚",
    "You are aligned with good fortune. Stay curious 🔮",
    "Trust your intuition — it’s whispering secrets to you 🤫",
    "Let go of fear. What’s coming is brighter than you imagine 🌟"
  ];

  revealBtn.addEventListener("click", () => {
    const random = Math.floor(Math.random() * fortunes.length);
    const fortune = fortunes[random];

    fortuneBox.innerHTML = `
      <h2>Your Fortune 🔮</h2>
      <p>${fortune}</p>
    `;

    setTimeout(() => {
      fortuneBox.scrollIntoView({ behavior: "smooth" });
    }, 2000); // Use 2-second delay as requested
  });
});

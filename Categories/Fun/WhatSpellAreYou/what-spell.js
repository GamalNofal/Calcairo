// what-spell.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("spellForm");
  const resultCard = document.getElementById("resultCard");
  const resultText = document.getElementById("spellResult");
  const tryAgainBtn = document.getElementById("tryAgain");
  const calculateBtn = document.getElementById("calculateBtn");

  const spellMap = {
    fire: ["Inferno Burst", "Blazing Phoenix", "Fireball Frenzy"],
    water: ["Tidal Veil", "Aqua Shield", "Whirlpool Whispers"],
    earth: ["Stone Guard", "Terra Bind", "Root Surge"],
    air: ["Gale Dance", "Whisper Wind", "Sky Leap"],
    light: ["Radiant Beam", "Divine Pulse", "Lumen Halo"],
    darkness: ["Shadow Blink", "Oblivion Fog", "Nightfall Curse"]
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const element = document.getElementById("element").value;
    const time = document.getElementById("time").value;
    const trait = document.getElementById("trait").value;

    // Build spell based on selections
    const baseSpells = spellMap[element];
    const timeSuffix = {
      dawn: " of Awakening",
      noon: " of Power",
      sunset: " of Twilight",
      midnight: " of Secrets"
    }[time];

    const traitPrefix = {
      bravery: "Hero's ",
      wisdom: "Sage's ",
      kindness: "Gentle ",
      mystery: "Arcane "
    }[trait];

    // Random base spell
    const randomBase = baseSpells[Math.floor(Math.random() * baseSpells.length)];
    const finalSpell = `${traitPrefix}${randomBase}${timeSuffix}`;

    // Display result
    resultText.textContent = finalSpell;
    resultCard.style.display = "block";

    highlightResult();
  });

  tryAgainBtn.addEventListener("click", () => {
    form.reset();
    resultCard.style.display = "none";
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  function highlightResult() {
    resultCard.classList.add("glow");
    resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => {
      resultCard.classList.remove("glow");
    }, 2000);
  }
});

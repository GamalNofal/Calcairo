document.addEventListener("DOMContentLoaded", () => {
  const nameInput = document.getElementById("nameInput");
  const resultBox = document.getElementById("resultBox");
  const resultCard = document.getElementById("resultCard");
  const generateBtn = document.getElementById("generateBtn");

  generateBtn.addEventListener("click", () => {
    const name = nameInput.value.trim();
    if (!name) {
      resultBox.innerHTML = "<p>Please enter a name to discover your planet.</p>";
      return;
    }

    const hash = hashCode(name.toLowerCase());
    const planetName = generatePlanetName(hash);
    const terrain = pick(hash, terrains);
    const orbit = pick(hash, orbits);
    const civilization = pick(hash, civilizations);
    const climate = pick(hash, climates);
    const emoji = pick(hash, emojis);
    const flag = generateFlag(hash);

    resultBox.innerHTML = `
      <span class="planet-icon">${emoji}</span>
      <p><strong>Planet Name:</strong> ${planetName}</p>
      <p><strong>Terrain:</strong> ${terrain}</p>
      <p><strong>Orbit:</strong> ${orbit}</p>
      <p><strong>Climate:</strong> ${climate}</p>
      <p><strong>Civilization:</strong> ${civilization}</p>
      <p><strong>Flag:</strong> <span style="font-size: 1.5rem;">${flag}</span></p>
      <button class="cta-btn" id="tryAgainBtn" style="margin-top: 1.5rem;">🔄 Try Another Name</button>
    `;

    scrollToResult();

    setTimeout(() => {
      document.getElementById("tryAgainBtn").addEventListener("click", () => {
        nameInput.value = "";
        nameInput.focus();
        document.querySelector(".input-card").scrollIntoView({ behavior: "smooth", block: "center" });
      });
    }, 100);
  });

  function hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
  }

  function pick(hash, array) {
    return array[hash % array.length];
  }

  function generatePlanetName(hash) {
    const syllables = ["zor", "an", "th", "rax", "ul", "mir", "tek", "qua", "ven", "lor", "eon", "dra"];
    let name = "";
    for (let i = 0; i < 3; i++) {
      name += syllables[(hash + i) % syllables.length];
    }
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  function generateFlag(hash) {
    const symbols = ["🔺", "🔷", "⬛", "⬜", "🌀", "☄️", "💥", "🌈", "♾️", "⚡"];
    let flag = "";
    for (let i = 0; i < 3; i++) {
      flag += symbols[(hash + i * 7) % symbols.length];
    }
    return flag;
  }

  function scrollToResult() {
    resultCard.classList.add("highlight");
    resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => resultCard.classList.remove("highlight"), 2000);
  }

  const terrains = [
    "Crystal Mountains", "Lava Fields", "Floating Islands", "Frozen Oceans", "Metallic Forests",
    "Endless Desert", "Gas Plains", "Coral Continents", "Glowing Canyons", "Shifting Sands"
  ];

  const orbits = [
    "Binary Star Orbit", "Chaotic Elliptical Orbit", "Dark Matter Belt", "Stable Solar Orbit",
    "Nebula Cluster", "Asteroid Ring Orbit", "Pulsar Drag Zone", "Shadow Spiral Path"
  ];

  const civilizations = [
    "Ancient Telepaths", "Robot Overlords", "Plant Beings", "Nomadic Cloud Riders",
    "Time-Traveling Historians", "Energy Lifeforms", "Sky Sailors", "Bio-Coded Species"
  ];

  const climates = [
    "Toxic Storms", "Perpetual Twilight", "Volcanic Snow", "Magnetic Winds",
    "Silent Ice", "Blue Mist", "Moisture-Heavy Fog", "Electro-Charged Air"
  ];

  const emojis = ["🪐", "🌍", "🌑", "🌠", "🛰️", "👽", "💫", "☄️", "🌌", "🔭"];
});

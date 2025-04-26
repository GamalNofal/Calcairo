const calculateBtn = document.getElementById("calculateBtn");
const resetBtn = document.getElementById("resetBtn");
const resultBox = document.getElementById("resultBox");

const wisdoms = [
  "True love is built on kindness, not calculators.",
  "A great relationship is made with effort, not luck.",
  "Compatibility is fun, but communication is key!",
  "Love grows where care, trust, and laughs live.",
  "No score can define your bond—only you both can.",
  "Listening with your heart builds bridges of love.",
  "Even the best match needs patience and support.",
  "Little gestures mean big love in the long run.",
  "Laughter is a secret ingredient to lasting love.",
  "Grow together, laugh together, stay curious together."
];

calculateBtn.addEventListener("click", () => {
  const name1 = document.getElementById("name1").value.trim();
  const name2 = document.getElementById("name2").value.trim();
  const dob1 = document.getElementById("dob1").value;
  const dob2 = document.getElementById("dob2").value;

  if (!name1 || !name2 || !dob1 || !dob2) {
    resultBox.innerHTML = `<h2>Oops!</h2><p>Please fill in all fields to calculate your love score.</p>`;
    return;
  }

  const baseScore = Math.abs((name1.length * 13 + name2.length * 17) % 100);
  const dateFactor = (new Date(dob1).getTime() + new Date(dob2).getTime()) % 100;
  const score = Math.round((baseScore + dateFactor) / 2);
  const emoji = score > 85 ? "💖" : score > 60 ? "💘" : score > 40 ? "❤️" : score > 20 ? "💔" : "🧊";
  const wisdom = wisdoms[Math.floor(Math.random() * wisdoms.length)];

  resultBox.innerHTML = `
    <h2>Your Love Score is: ${emoji} ${score}%</h2>
    <p><strong>${name1}</strong> & <strong>${name2}</strong> have a spark score of <strong>${score}%</strong>.</p>
    <p>${wisdom}</p>
  `;

  setTimeout(() => {
    resultBox.scrollIntoView({ behavior: "smooth" });
  }, 2000);
});

resetBtn.addEventListener("click", () => {
  document.getElementById("name1").value = "";
  document.getElementById("name2").value = "";
  document.getElementById("dob1").value = "";
  document.getElementById("dob2").value = "";
  resultBox.innerHTML = `
    <h2>Your Love Score Appears Here 💌</h2>
    <p>Start by entering your names and dates. Then click the button for fun results!</p>
  `;
});

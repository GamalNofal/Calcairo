document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ JS loaded");

  const rollBtn = document.getElementById("randomBtn");
  const rangeSelect = document.getElementById("range");
  const resultBox = document.getElementById("randomResult");

  if (!rollBtn || !rangeSelect || !resultBox) {
    console.error("❌ Element not found. Check IDs.");
    return;
  }

  rollBtn.addEventListener("click", () => {
    const max = parseInt(rangeSelect.value);
    const randomNumber = Math.floor(Math.random() * max) + 1;

    resultBox.innerHTML = `
      <h2>Your Random Number 🎲</h2>
      <div style="font-size: 2.5rem; font-weight: bold;">${randomNumber}</div>
      <p>Totally random and just for fun!</p>
    `;

    setTimeout(() => {
      resultBox.scrollIntoView({ behavior: "smooth" });
    }, 2000);
  });
});

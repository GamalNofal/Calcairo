let lastCombo = "";
let lastRating = 0;
let lastMessage = "";

function highlightAndScrollToResult() {
  const result = document.getElementById("burgerResult");
  if (!result) return;

  result.classList.remove("highlight-flash");
  setTimeout(() => {
    result.scrollIntoView({ behavior: "smooth", block: "center" });
    result.classList.add("highlight-flash");
    setTimeout(() => {
      result.classList.remove("highlight-flash");
    }, 1400);
  }, 120);
}

document.addEventListener("DOMContentLoaded", function () {
  const rateBtn = document.getElementById("rateBtn");
  const result = document.getElementById("burgerResult");

  rateBtn.addEventListener("click", function () {
    const buns = document.getElementById("buns").value;
    const meat = document.getElementById("meat").value;
    const cheese = document.getElementById("cheese").value;
    const sauce = document.getElementById("sauce").value;

    const combo = `${buns} bun, ${meat} patty, ${cheese} cheese, ${sauce} sauce`;

    // Only generate new rating if combo is different
    if (combo !== lastCombo) {
      lastCombo = combo;
      lastRating = Math.floor(Math.random() * 5) + 1;

      if (lastRating === 5) {
        lastMessage = "🌟 Burger Masterpiece! Gordon Ramsay is proud.";
      } else if (lastRating >= 4) {
        lastMessage = "🔥 That's one tasty burger!";
      } else if (lastRating >= 3) {
        lastMessage = "😋 Solid choice! Maybe toast the buns next time.";
      } else if (lastRating >= 2) {
        lastMessage = "😅 Could use some extra spice!";
      } else {
        lastMessage = "😬 Not even the dog wants it... try again!";
      }
    }

    result.innerHTML = `
      <h2>Your Burger 🍔</h2>
      <p><strong>Combo:</strong> ${combo}</p>
      <p><strong>Rating:</strong> ${lastRating} / 5</p>
      <p>${lastMessage}</p>
    `;

    highlightAndScrollToResult();
  });
});

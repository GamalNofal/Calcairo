document.addEventListener("DOMContentLoaded", () => {
  const printedCount = document.getElementById("printedCount");
  const printedPrice = document.getElementById("printedPrice");
  const digitalCount = document.getElementById("digitalCount");
  const digitalPrice = document.getElementById("digitalPrice");
  const viewOption = document.getElementById("viewOption");
  const resultBox = document.getElementById("resultBox");
  const resultCard = document.getElementById("resultCard");
  const calculateBtn = document.getElementById("calculateBtn");

  calculateBtn.addEventListener("click", () => {
    const pCount = parseInt(printedCount.value) || 0;
    const pPrice = parseFloat(printedPrice.value) || 0;
    const dCount = parseInt(digitalCount.value) || 0;
    const dPrice = parseFloat(digitalPrice.value) || 0;

    const totalPrinted = pCount * pPrice;
    const totalDigital = dCount * dPrice;
    const total = totalPrinted + totalDigital;

    const monthly = total / 12;
    const weekly = total / 52;
    const daily = total / 365;

    const view = viewOption.value;

    let output = "";

    if (view === "year" || view === "all") {
      output += `<p><strong>Yearly Total:</strong> $${total.toFixed(2)}</p>`;
    }
    if (view === "month" || view === "all") {
      output += `<p><strong>Monthly Cost:</strong> $${monthly.toFixed(2)}</p>`;
    }
    if (view === "week" || view === "all") {
      output += `<p><strong>Weekly Cost:</strong> $${weekly.toFixed(2)}</p>`;
    }
    if (view === "day" || view === "all") {
      output += `<p><strong>Daily Cost:</strong> $${daily.toFixed(2)}</p>`;
    }

    const comments = [
      "Books are cheaper than therapy — barely 😅",
      "Your bookshelf called. It needs more space 📚",
      "You're building a personal library — and a legacy!",
      "A book a week keeps the boredom away 📖",
      "Could’ve bought a small island… but books are better 🏝️",
      "Those late-night book hauls add up 🛒📘",
      "Smells like fresh ink and financial commitment 😆",
      "Reading is priceless. Your wallet disagrees 💸",
      "Page turners and penny burners 🔥",
      "Just one more book… said your credit card too 😬",
      "Spending on stories = investing in imagination 💡",
      "You're supporting authors — and Amazon's yacht fund 😄",
      "This is what passion looks like... and it’s $${total.toFixed(2)}",
      "Books are friends you pay for 🧠❤️",
      "You could start a micro-library at this point 😄",
      "Bookmark this spending. Literally 📑",
      "A chapter a day keeps regret away — mostly 😂",
      "Your TBR is taller than your savings 🏔️",
      "We call this: responsible intellectual indulgence 👓",
      "You may be broke, but at least you’re book-rich 📦📚"
    ];
    const randomMessage = comments[Math.floor(Math.random() * comments.length)];

    resultBox.innerHTML = output + `<p class="quote">💬 ${randomMessage}</p>`;

    scrollToResult();
  });

  function scrollToResult() {
    resultCard.classList.add("highlight");
    resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => resultCard.classList.remove("highlight"), 2000);
  }
});

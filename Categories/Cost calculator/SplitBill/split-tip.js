document.addEventListener("DOMContentLoaded", () => {
  const billInput = document.getElementById("billAmount");
  const tipInput = document.getElementById("tipPercent");
  const peopleInput = document.getElementById("peopleCount");
  const resultBox = document.getElementById("resultBox");
  const resultCard = document.getElementById("resultCard");
  const calculateBtn = document.getElementById("calculateBtn");

  calculateBtn.addEventListener("click", () => {
    const bill = parseFloat(billInput.value);
    const tipPercent = parseFloat(tipInput.value);
    const people = parseInt(peopleInput.value);

    if (isNaN(bill) || bill <= 0 || isNaN(tipPercent) || tipPercent < 0 || isNaN(people) || people <= 0) {
      resultBox.innerHTML = `<p>Please enter valid values for all fields.</p>`;
      return;
    }

    const tipAmount = bill * (tipPercent / 100);
    const totalWithTip = bill + tipAmount;
    const perPerson = totalWithTip / people;

    const messages = [
      "Better split it now before the waiter brings the check 😅",
      "Math saves friendships. Trust the calculator 🧮",
      "No more 'I'll get you next time' excuses 🍽️",
      "Even split = peaceful night ✌️",
      "That’s cheaper than your last online order, admit it 😄",
      "Tip well. Karma watches 👀",
      "Fair and square — like a perfectly cut pizza slice 🍕",
      "That's one less awkward moment at dinner 💡",
      "Don't let your friend Venmo you in cents again 💸",
      "Friendship tax not included. That’s on you 😏",
      "Yes, you're paying for the extra guac 🥑",
      "One person always rounds weird — not today 🔍",
      "You came, you ate, you calculated 🔢",
      "Cheaper than therapy, more accurate than guessing 🧠",
      "Next time: bring a calculator to dinner 😎"
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    resultBox.innerHTML = `
      <p><strong>Bill:</strong> $${bill.toFixed(2)}</p>
      <p><strong>Tip (${tipPercent}%):</strong> $${tipAmount.toFixed(2)}</p>
      <p><strong>Total with Tip:</strong> $${totalWithTip.toFixed(2)}</p>
      <p><strong>Each Person Owes:</strong> $${perPerson.toFixed(2)}</p>
      <p style="margin-top: 1rem; font-size: 0.9rem; color: #555;">💬 ${randomMessage}</p>
    `;

    scrollToResult();
  });

  function scrollToResult() {
    resultCard.classList.add("highlight");
    resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => resultCard.classList.remove("highlight"), 2000);
  }
});

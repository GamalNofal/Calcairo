document.addEventListener("DOMContentLoaded", function () {
  const calculateBtn = document.getElementById("calculateBtn");
  const resultCard = document.getElementById("resultCard");

  const tips = [
    "Budget wisely and enjoy your adventure!",
    "Don’t forget to save for souvenirs and snacks!",
    "Planning ahead saves more than money—it saves stress!",
    "Travel is the only thing you buy that makes you richer.",
    "A little planning goes a long way when you explore.",
    "Keep your wallet happy and your memories full!",
    "Every dollar you plan for is a step closer to peace of mind.",
    "Smart budgeting means more travel in the future!"
  ];

  calculateBtn.addEventListener("click", function () {
    const travelers = parseInt(document.getElementById("travelers").value);
    const days = parseInt(document.getElementById("days").value);
    const hotel = parseFloat(document.getElementById("hotel").value);
    const food = parseFloat(document.getElementById("food").value);
    const transport = parseFloat(document.getElementById("transport").value);
    const extra = parseFloat(document.getElementById("extra").value);

    if (
      isNaN(travelers) || isNaN(days) ||
      isNaN(hotel) || isNaN(food) || isNaN(transport) || isNaN(extra)
    ) {
      resultCard.innerHTML = `
        <h2>Oops!</h2>
        <p>Please fill out all the fields correctly to calculate your trip cost.</p>
      `;
      return;
    }

    const dailyPerPerson = hotel + food + transport;
    const totalCost = (dailyPerPerson * days * travelers) + extra;
    const randomTip = tips[Math.floor(Math.random() * tips.length)];

    resultCard.innerHTML = `
      <h2>Estimated Trip Cost 🧾</h2>
      <p><strong>Total Travelers:</strong> ${travelers}</p>
      <p><strong>Trip Duration:</strong> ${days} days</p>
      <p><strong>Total Estimated Cost:</strong> $${totalCost.toFixed(2)}</p>
      <p>${randomTip}</p>
    `;

    setTimeout(() => {
      resultCard.scrollIntoView({ behavior: "smooth" });
    }, 2000);
  });
});

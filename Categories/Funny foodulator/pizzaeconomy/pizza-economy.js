document.addEventListener("DOMContentLoaded", () => {
  const incomeInput = document.getElementById("income");
  const pizzaPriceInput = document.getElementById("pizzaPrice");
  const resultBox = document.getElementById("resultBox");
  const resultCard = document.getElementById("resultCard");
  const calculateBtn = document.getElementById("calculateBtn");

  calculateBtn.addEventListener("click", () => {
    const income = parseFloat(incomeInput.value);
    const price = parseFloat(pizzaPriceInput.value);
    const priceType = document.querySelector('input[name="priceType"]:checked').value;

    if (isNaN(income) || isNaN(price) || income <= 0 || price <= 0) {
      resultBox.innerHTML = "<p>Please enter valid income and pizza price.</p>";
      return;
    }

    const slicePrice = (priceType === "pizza") ? price / 8 : price;
    const slices = Math.floor(income / slicePrice);
    const tier = getPizzaTier(slices);

    resultBox.innerHTML = `
      <p>You could afford <strong>${slices.toLocaleString()}</strong> slices of pizza per month. 🍕</p>
      <p>Your Pizza Economy Tier: <strong>${tier}</strong></p>
      <p><em>(Note: This assumes zero rent and 100% pizza investment. Bold strategy.)</em></p>
    `;

    scrollToResult();
  });

  function getPizzaTier(slices) {
    if (slices >= 1000) return "🍕 Pizza Tycoon";
    if (slices >= 500) return "🍕🍕 Upper Crust Elite";
    if (slices >= 200) return "Stuffed Crust Hustler";
    if (slices >= 100) return "Regular Slice Citizen";
    if (slices >= 50) return "Barely Dough";
    return "Crumb-Level Struggler";
  }

  function scrollToResult() {
    resultCard.classList.add("highlight");
    resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => resultCard.classList.remove("highlight"), 2000);
  }
});

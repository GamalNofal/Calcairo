document.getElementById("calcBtn").addEventListener("click", () => {
    const daily = parseFloat(document.getElementById("dailyCost").value);
    const people = parseInt(document.getElementById("people").value);
    const days = parseInt(document.getElementById("days").value);
    const resultBox = document.getElementById("resultBox");
  
    if (isNaN(daily) || isNaN(people) || isNaN(days) || daily < 0 || people < 1 || days < 1) {
      resultBox.innerHTML = `<h2>Missing or Invalid Input</h2><p>Please fill in all fields with valid values.</p>`;
      return;
    }
  
    const total = daily * people * days;
  
    resultBox.innerHTML = `
      <h2>Estimated Monthly Budget</h2>
      <p><strong>$${total.toFixed(2)}</strong> for ${people} person(s), eating at $${daily.toFixed(2)} per day over ${days} days.</p>
    `;
  
    setTimeout(() => {
      resultBox.scrollIntoView({ behavior: "smooth" });
    }, 2000);
  });
  
function switchUnit(isMetric) {
  const unitSystem = document.getElementById("unitSystem");
  unitSystem.dataset.unit = isMetric ? "metric" : "imperial";
  document.getElementById("weight").placeholder = isMetric ? "kg" : "lbs";
}

function calculate1RM() {
  const weight = parseFloat(document.getElementById("weight").value);
  const reps = parseInt(document.getElementById("reps").value);
  const age = document.getElementById("age").value;
  const isMetric = document.getElementById("unitSystem").dataset.unit === "metric";
  const resultBox = document.getElementById("results");

  if (isNaN(weight) || isNaN(reps) || reps < 1) {
    resultBox.innerHTML = `<p>Please enter a valid weight and number of reps.</p>`;
    return;
  }

  const w = isMetric ? weight : weight * 0.453592; // Convert lbs to kg if needed

  const epley = w * (1 + reps / 30);
  const brzycki = w * (36 / (37 - reps));
  const lombardi = w * Math.pow(reps, 0.10);
  const oconner = w * (1 + 0.025 * reps);
  const avg = ((epley + brzycki + lombardi + oconner) / 4).toFixed(2);

  resultBox.innerHTML = `
    <p><strong>Epley:</strong> ${epley.toFixed(2)} kg<br><small>Best for moderate reps (3–10)</small></p>
    <p><strong>Brzycki:</strong> ${brzycki.toFixed(2)} kg<br><small>Most accurate for reps under 10</small></p>
    <p><strong>Lombardi:</strong> ${lombardi.toFixed(2)} kg<br><small>Useful at high rep ranges</small></p>
    <p><strong>O’Conner:</strong> ${oconner.toFixed(2)} kg<br><small>Good general-purpose formula</small></p>
    <hr />
    <p><strong>Average 1RM:</strong> ${avg} kg</p>
    <p class="bmi-label">Note: Each formula has strengths. The average gives a balanced estimate for general training goals.</p>
    ${age ? `<p><em>Note:</em> Age (${age}) can influence recovery and adaptation, but not directly used in 1RM formulas.</p>` : ""}
    <details style="margin-top: 1rem;">
      <summary style="cursor: pointer; font-weight: bold;">What do these formulas mean?</summary>
      <p><strong>Epley:</strong> Widely used and reliable for 3–10 reps. Assumes linear increase in strength.</p>
      <p><strong>Brzycki:</strong> Great for fewer than 10 reps. Common in personal training and gyms.</p>
      <p><strong>Lombardi:</strong> Incorporates endurance scaling. Best for higher rep sets (10+).</p>
      <p><strong>O’Conner:</strong> A simplified formula used for quick estimation across all rep ranges.</p>
    </details>
  `;

  scrollToResult();
}

function scrollToResult() {
  const resultCard = document.getElementById("resultCard");
  resultCard.classList.add("highlight");
  resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
  setTimeout(() => resultCard.classList.remove("highlight"), 2000);
}

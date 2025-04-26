function calculateIdealWeight() {
  const gender = document.getElementById("gender").value;
  const height = parseFloat(document.getElementById("height").value);
  const current = parseFloat(document.getElementById("current").value);
  const isMetric = document.getElementById("unitSystem").dataset.unit === "metric";

  if (!height || height <= 0) {
    document.getElementById("idealResult").innerHTML = "Please enter a valid height.";
    return;
  }

  const heightCm = isMetric ? height : height * 2.54;

  // Formulas
  const robinson = gender === "male" ? 52 + 1.9 * ((heightCm - 152.4) / 2.54) : 49 + 1.7 * ((heightCm - 152.4) / 2.54);
  const miller = gender === "male" ? 56.2 + 1.41 * ((heightCm - 152.4) / 2.54) : 53.1 + 1.36 * ((heightCm - 152.4) / 2.54);
  const devine = gender === "male" ? 50 + 2.3 * ((heightCm - 152.4) / 2.54) : 45.5 + 2.3 * ((heightCm - 152.4) / 2.54);
  const hamwi = gender === "male" ? 48 + 2.7 * ((heightCm - 152.4) / 2.54) : 45.5 + 2.2 * ((heightCm - 152.4) / 2.54);

  const weights = [robinson, miller, devine, hamwi];
  const average = weights.reduce((a, b) => a + b) / weights.length;
  const min = Math.min(...weights);
  const max = Math.max(...weights);

  let feedback = "";
  if (!isNaN(current)) {
    if (current >= min && current <= max) {
      feedback = `<p style="color:green;">✅ Your weight is within the ideal range.</p>`;
    } else if (current < min - 5 || current > max + 5) {
      feedback = `<p style="color:red;">❌ Your weight is far from the ideal range.</p>`;
    } else {
      feedback = `<p style="color:orange;">⚠️ Your weight is slightly outside the ideal range.</p>`;
    }
  }

  document.getElementById("idealResult").innerHTML = `
    <strong>Average Ideal Weight:</strong> ${average.toFixed(1)} kg<br>
    <strong>Healthy Range:</strong> ${min.toFixed(1)} – ${max.toFixed(1)} kg<br>
    <p>These values are based on multiple clinical formulas.</p>
    ${feedback}
  `;

  scrollToResult();
}

function scrollToResult() {
  const resultCard = document.getElementById("resultCard");
  resultCard.classList.add("highlight");
  resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
  setTimeout(() => resultCard.classList.remove("highlight"), 2000);
}

function switchUnit(isMetric) {
  const unitSystem = document.getElementById("unitSystem");
  unitSystem.dataset.unit = isMetric ? "metric" : "us";

  document.getElementById("height").placeholder = isMetric ? "cm" : "inches";
  document.getElementById("current").placeholder = isMetric ? "kg" : "lbs";
}

function calculateBodyFat() {
  const gender = document.getElementById("gender").value;
  const age = parseFloat(document.getElementById("age").value);
  const weight = parseFloat(document.getElementById("weight").value);
  const height = parseFloat(document.getElementById("height").value);
  const waist = parseFloat(document.getElementById("waist").value);
  const hip = parseFloat(document.getElementById("hip").value);
  const neck = parseFloat(document.getElementById("neck").value);
  const isMetric = document.getElementById("unitSystem").dataset.unit === "metric";

  let bodyFat = 0;

  if (gender === "male") {
    const w = isMetric ? waist : waist * 2.54;
    const n = isMetric ? neck : neck * 2.54;
    const h = isMetric ? height : height * 2.54;

    bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450;
  } else {
    const w = isMetric ? waist : waist * 2.54;
    const hp = isMetric ? hip : hip * 2.54;
    const n = isMetric ? neck : neck * 2.54;
    const h = isMetric ? height : height * 2.54;

    bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(w + hp - n) + 0.22100 * Math.log10(h)) - 450;
  }

  const rounded = bodyFat.toFixed(2);
  const result = document.getElementById("bmrResult");
  result.innerHTML = `Estimated Body Fat: <strong>${rounded}%</strong>`;

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

  // Set placeholders
  document.getElementById("weight").placeholder = isMetric ? "kg" : "lbs";
  document.getElementById("waist").placeholder = isMetric ? "cm" : "in";
  document.getElementById("hip").placeholder = isMetric ? "cm" : "in";
  document.getElementById("neck").placeholder = isMetric ? "cm" : "in";
  document.getElementById("height").placeholder = isMetric ? "cm" : "in";

  // Update button active styles
  const buttons = document.querySelectorAll(".unit-btn");
  buttons.forEach(btn => btn.classList.remove("active"));
  buttons[isMetric ? 0 : 1].classList.add("active");
}

// Reference section toggle
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggleReference");
  const refSection = document.getElementById("referenceSection");

  if (toggleBtn && refSection) {
    toggleBtn.addEventListener("click", () => {
      refSection.style.display = refSection.style.display === "none" ? "block" : "none";
    });
  }
});

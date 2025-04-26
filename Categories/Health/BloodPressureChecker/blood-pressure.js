document.addEventListener("DOMContentLoaded", () => {
  const systolicInput = document.getElementById("systolic");
  const diastolicInput = document.getElementById("diastolic");
  const resultBox = document.getElementById("resultBox");
  const resultCard = document.getElementById("resultCard");
  const checkBtn = document.getElementById("checkBtn");

  checkBtn.addEventListener("click", () => {
    const systolic = parseInt(systolicInput.value);
    const diastolic = parseInt(diastolicInput.value);

    if (isNaN(systolic) || isNaN(diastolic)) {
      resultBox.innerHTML = "<p>Please enter both systolic and diastolic values.</p>";
      return;
    }

    let category = "";
    let advice = "";

    // Classify using highest severity between systolic and diastolic
    if (systolic > 180 || diastolic > 120) {
      category = "Hypertensive Crisis";
      advice = "Seek immediate medical attention.";
    } else if (systolic >= 140 || diastolic >= 90) {
      category = "Hypertension Stage 2";
      advice = "High risk. Medical evaluation is recommended.";
    } else if ((systolic >= 130 && systolic <= 139) || (diastolic >= 80 && diastolic <= 89)) {
      category = "Hypertension Stage 1";
      advice = "Consider lifestyle changes and consult a healthcare provider.";
    } else if (systolic >= 120 && systolic <= 129 && diastolic < 80) {
      category = "Elevated";
      advice = "Watch your lifestyle — risk of hypertension is rising.";
    } else if (systolic < 120 && diastolic < 80) {
      category = "Normal";
      advice = "Keep up the healthy lifestyle!";
    } else {
      category = "Unclassified";
      advice = "Values may be unusual. Please recheck your input.";
    }

    resultBox.innerHTML = `
      <p><strong>Category:</strong> ${category}</p>
      <p><strong>Systolic:</strong> ${systolic} mm Hg</p>
      <p><strong>Diastolic:</strong> ${diastolic} mm Hg</p>
      <p style="margin-top: 1rem;">🩺 ${advice}</p>
      <p style="margin-top: 1rem; font-size: 0.9rem; color: #555;">
        ⚠️ This tool is for educational purposes only. Always consult your doctor for medical advice.
      </p>
    `;

    scrollToResult();
  });

  function scrollToResult() {
    resultCard.classList.add("highlight");
    resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => resultCard.classList.remove("highlight"), 2000);
  }
});

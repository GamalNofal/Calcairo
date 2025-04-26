function updateBMI() {
  const weight = parseFloat(document.getElementById("weight").value);
  const height = parseFloat(document.getElementById("height").value) / 100;

  document.getElementById("weightInput").value = weight;
  document.getElementById("heightInput").value = Math.round(height * 100);

  const bmi = weight / (height * height);
  const roundedBMI = bmi.toFixed(2);
  document.getElementById("bmiValue").innerText = roundedBMI + " kg/m²";

  let message = "";
  if (bmi < 18.5) {
    message = "You are underweight.";
  } else if (bmi < 25) {
    message = "You have a normal weight.";
  } else if (bmi < 30) {
    message = "You are overweight.";
  } else {
    message = "You are obese.";
  }

  document.getElementById("bmiMessage").innerHTML =
    `<h3>Understand Your Health Better</h3><p>${message} Your BMI result can help you understand your health better. Discuss your BMI with a healthcare provider for personalized advice.</p>`;

  scrollToResult();
}

function scrollToResult() {
  const resultCard = document.getElementById("resultCard");
  resultCard.classList.add("highlight");
  resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
  setTimeout(() => resultCard.classList.remove("highlight"), 1200);
}

function setupSlider(inputId, valueId, callback) {
  const slider = document.getElementById(inputId);
  const number = document.getElementById(valueId);

  slider.addEventListener("change", () => {
    number.value = slider.value;
    callback();
  });

  number.addEventListener("change", () => {
    slider.value = number.value;
    callback();
  });
}

document.addEventListener("DOMContentLoaded", function () {
  setupSlider("weight", "weightInput", updateBMI);
  setupSlider("height", "heightInput", updateBMI);
  updateBMI();
});

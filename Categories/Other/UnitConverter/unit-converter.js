document.addEventListener("DOMContentLoaded", () => {
  const unitButtons = document.querySelectorAll(".unit-tab");
  const fromInput = document.getElementById("fromValue");
  const fromUnit = document.getElementById("fromUnit");
  const toUnit = document.getElementById("toUnit");
  const resultBox = document.getElementById("resultBox");
  const resultCard = document.querySelector(".result-card");

  let currentCategory = "length";

  const units = {
    length: {
      mm: 0.001,
      cm: 0.01,
      m: 1,
      km: 1000,
      in: 0.0254,
      ft: 0.3048,
      yd: 0.9144,
      mi: 1609.34
    },
    temperature: {
      C: "Celsius",
      F: "Fahrenheit",
      K: "Kelvin"
    },
    area: {
      "mm²": 1e-6,
      "cm²": 1e-4,
      "m²": 1,
      "km²": 1e6,
      "in²": 0.00064516,
      "ft²": 0.092903,
      "yd²": 0.836127,
      "mi²": 2.59e6
    },
    volume: {
      ml: 0.001,
      cl: 0.01,
      l: 1,
      "m³": 1000,
      "in³": 0.0163871,
      "ft³": 28.3168,
      "yd³": 764.555,
      gal: 3.78541
    },
    weight: {
      mg: 0.000001,
      g: 0.001,
      kg: 1,
      t: 1000,
      oz: 0.0283495,
      lb: 0.453592,
      st: 6.35029
    },
    time: {
      sec: 1,
      min: 60,
      hr: 3600,
      day: 86400,
      week: 604800,
      mo: 2.628e6,
      yr: 3.154e7
    }
  };

  function populateUnits(category) {
    fromUnit.innerHTML = "";
    toUnit.innerHTML = "";

    Object.keys(units[category]).forEach(unit => {
      const optionFrom = document.createElement("option");
      optionFrom.value = unit;
      optionFrom.textContent = unit;

      const optionTo = document.createElement("option");
      optionTo.value = unit;
      optionTo.textContent = unit;

      fromUnit.appendChild(optionFrom);
      toUnit.appendChild(optionTo);
    });
  }

  // Handle category switching
  unitButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      unitButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      currentCategory = btn.dataset.tab;
      populateUnits(currentCategory);
    });
  });

  // Initial load
  populateUnits(currentCategory);

  window.convertUnit = function () {
    const value = parseFloat(fromInput.value);
    const from = fromUnit.value;
    const to = toUnit.value;

    if (isNaN(value)) {
      resultBox.innerText = "Please enter a valid number.";
      return;
    }

    let result;

    if (currentCategory === "temperature") {
      result = convertTemperature(value, from, to);
    } else {
      const factorFrom = units[currentCategory][from];
      const factorTo = units[currentCategory][to];
      result = value * (factorFrom / factorTo);
    }

    resultBox.innerText = `${value} ${from} = ${result.toFixed(4)} ${to}`;
    highlightResult();
  };

  function convertTemperature(val, from, to) {
    let tempC;

    if (from === to) return val;

    if (from === "C") tempC = val;
    else if (from === "F") tempC = (val - 32) * (5 / 9);
    else if (from === "K") tempC = val - 273.15;

    if (to === "C") return tempC;
    else if (to === "F") return tempC * (9 / 5) + 32;
    else if (to === "K") return tempC + 273.15;
  }

  function highlightResult() {
    resultCard.classList.add("highlight");
    resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => resultCard.classList.remove("highlight"), 2000);
  }
});

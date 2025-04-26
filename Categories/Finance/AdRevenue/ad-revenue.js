function updateAdRevenue() {
  const traffic = parseInt(document.getElementById("traffic").value);
  const rpm = parseFloat(document.getElementById("rpm").value);

  document.getElementById("trafficInput").value = traffic;
  document.getElementById("rpmInput").value = rpm;

  const monthlyRevenue = (traffic / 1000) * rpm;
  const annualRevenue = monthlyRevenue * 12;

  document.getElementById("monthlyRevenue").innerText = `$${monthlyRevenue.toFixed(0)}`;
  document.getElementById("annualRevenue").innerText = `$${annualRevenue.toFixed(0)}`;

  highlightAndScrollResult();
}

// Sync slider and input
function syncSlider(sliderId, inputId, callback) {
  const slider = document.getElementById(sliderId);
  const input = document.getElementById(inputId);

  slider.addEventListener("input", () => {
    input.value = slider.value;
    callback();
  });

  input.addEventListener("input", () => {
    slider.value = input.value;
    callback();
  });
}

// Highlight result and scroll after slight delay
let resultTimeout;
function highlightAndScrollResult() {
  clearTimeout(resultTimeout);
  resultTimeout = setTimeout(() => {
    const resultCard = document.getElementById("resultCard");
    resultCard.classList.add("highlight");

    resultCard.scrollIntoView({ behavior: "smooth", block: "center" });

    setTimeout(() => {
      resultCard.classList.remove("highlight");
    }, 1600);
  }, 250);
}

document.addEventListener("DOMContentLoaded", () => {
  syncSlider("traffic", "trafficInput", updateAdRevenue);
  syncSlider("rpm", "rpmInput", updateAdRevenue);
  updateAdRevenue();
});

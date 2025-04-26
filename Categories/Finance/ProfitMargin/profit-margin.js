function updateProfitMargin() {
  const price = parseFloat(document.getElementById("unitPrice").value);
  const sold = parseFloat(document.getElementById("unitsSold").value);
  const cost = parseFloat(document.getElementById("unitCost").value);

  document.getElementById("unitPriceInput").value = price;
  document.getElementById("unitsSoldInput").value = sold;
  document.getElementById("unitCostInput").value = cost;

  const revenue = price * sold;
  const cogs = cost * sold;
  const profit = revenue - cogs;
  const margin = revenue > 0 ? (profit / revenue) * 100 : 0;

  document.getElementById("revenue").innerText = "$" + revenue.toLocaleString();
  document.getElementById("cogs").innerText = "$" + cogs.toLocaleString();
  document.getElementById("grossProfit").innerText = "$" + profit.toLocaleString();
  document.getElementById("profitMargin").innerText = margin.toFixed(2) + "%";

  scrollToAndHighlight("resultCard");
}

function setupSlider(inputId, numberId, callback) {
  const range = document.getElementById(inputId);
  const number = document.getElementById(numberId);
  let timeout;

  const triggerUpdate = () => {
    clearTimeout(timeout);
    timeout = setTimeout(callback, 300);
  };

  range.addEventListener("input", () => {
    number.value = range.value;
    triggerUpdate();
  });

  number.addEventListener("input", () => {
    range.value = number.value;
    triggerUpdate();
  });
}

function scrollToAndHighlight(id) {
  const el = document.getElementById(id);
  if (!el) return;

  el.scrollIntoView({ behavior: "smooth", block: "center" });
  el.classList.add("highlight");
  setTimeout(() => {
    el.classList.remove("highlight");
  }, 1500);
}

document.addEventListener("DOMContentLoaded", function () {
  setupSlider("unitPrice", "unitPriceInput", updateProfitMargin);
  setupSlider("unitsSold", "unitsSoldInput", updateProfitMargin);
  setupSlider("unitCost", "unitCostInput", updateProfitMargin);
  updateProfitMargin();
});

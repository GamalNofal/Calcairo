document.addEventListener("DOMContentLoaded", () => {
    const calculateBtn = document.getElementById("calculateBtn");
    const addRowBtn = document.getElementById("addRowBtn");
    const container = document.getElementById("subscriptionContainer");
    const resultBox = document.getElementById("resultBox");
    const resultCard = document.getElementById("resultCard");
  
    // Calculate total cost
    calculateBtn.addEventListener("click", () => {
      const rows = container.querySelectorAll(".subscription-row");
      let total = 0;
  
      rows.forEach(row => {
        const costInput = row.querySelector(".service-cost");
        const cost = parseFloat(costInput.value);
        if (!isNaN(cost)) total += cost;
      });
  
      const yearly = total * 12;
  
      resultBox.innerHTML = `
        <p><strong>Total Monthly:</strong> $${total.toFixed(2)}</p>
        <p><strong>Yearly Cost:</strong> $${yearly.toFixed(2)}</p>
        <p style="margin-top: 1rem; font-size: 0.9rem; color: #555;">
          🧠 That's enough for a vacation, new laptop, or investing! Just saying...
        </p>
      `;
      scrollToResult();
    });
  
    // Add new row
    addRowBtn.addEventListener("click", () => {
      const row = document.createElement("div");
      row.className = "subscription-row";
      row.innerHTML = `
        <input type="text" class="service-name" placeholder="Service (e.g. Disney+)" />
        <input type="number" class="service-cost" placeholder="Monthly Cost" min="0" />
        <button class="remove-btn" onclick="removeRow(this)">✖</button>
      `;
      container.insertBefore(row, addRowBtn);
    });
  
    // Smooth scroll
    function scrollToResult() {
      resultCard.classList.add("highlight");
      resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => resultCard.classList.remove("highlight"), 2000);
    }
  });
  
  // Remove row (global to allow inline usage)
  function removeRow(btn) {
    btn.parentElement.remove();
  }
  
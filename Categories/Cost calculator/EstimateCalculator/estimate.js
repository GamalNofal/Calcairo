document.addEventListener("DOMContentLoaded", () => {
    const itemList = document.getElementById("itemList");
    const addRowBtn = document.getElementById("addRowBtn");
    const calculateBtn = document.getElementById("calculateBtn");
    const bufferInput = document.getElementById("buffer");
    const resultBox = document.getElementById("resultBox");
    const resultCard = document.getElementById("resultCard");
  
    // Add new item row
    addRowBtn.addEventListener("click", () => {
      const row = document.createElement("div");
      row.className = "estimate-row";
      row.innerHTML = `
        <input type="text" class="item-name" placeholder="Item name" />
        <input type="number" class="item-cost" placeholder="Cost ($)" min="0" />
        <button class="remove-btn" onclick="removeRow(this)">✖</button>
      `;
      itemList.insertBefore(row, addRowBtn);
    });
  
    // Calculate total + buffer
    calculateBtn.addEventListener("click", () => {
      const rows = itemList.querySelectorAll(".estimate-row");
      let total = 0;
  
      rows.forEach(row => {
        const costInput = row.querySelector(".item-cost");
        const cost = parseFloat(costInput.value);
        if (!isNaN(cost)) total += cost;
      });
  
      const bufferPercent = parseFloat(bufferInput.value) || 0;
      const bufferAmount = total * (bufferPercent / 100);
      const totalWithBuffer = total + bufferAmount;
  
      resultBox.innerHTML = `
        <p><strong>Base Estimate:</strong> $${total.toFixed(2)}</p>
        <p><strong>Buffer (${bufferPercent}%):</strong> $${bufferAmount.toFixed(2)}</p>
        <hr style="margin: 1rem 0;">
        <p><strong>Total Estimate:</strong> $${totalWithBuffer.toFixed(2)}</p>
      `;
      scrollToResult();
    });
  });
  
  // Remove item row
  function removeRow(btn) {
    btn.parentElement.remove();
  }
  
  // Scroll to result
  function scrollToResult() {
    const resultCard = document.getElementById("resultCard");
    resultCard.classList.add("highlight");
    resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => resultCard.classList.remove("highlight"), 2000);
  }
  
document.addEventListener("DOMContentLoaded", () => {
    const originalInput = document.getElementById("originalPrice");
    const discountInput = document.getElementById("discount");
    const taxInput = document.getElementById("tax");
    const feesInput = document.getElementById("fees");
    const calculateBtn = document.getElementById("calculateBtn");
    const resultBox = document.getElementById("resultBox");
    const resultCard = document.getElementById("resultCard");
  
    calculateBtn.addEventListener("click", () => {
      const original = parseFloat(originalInput.value);
      const discount = parseFloat(discountInput.value) || 0;
      const tax = parseFloat(taxInput.value) || 0;
      const fees = parseFloat(feesInput.value) || 0;
  
      if (isNaN(original) || original <= 0) {
        resultBox.innerHTML = "<p>Please enter a valid original price.</p>";
        return;
      }
  
      const discountAmount = original * (discount / 100);
      const afterDiscount = original - discountAmount;
      const taxAmount = afterDiscount * (tax / 100);
      const finalPrice = afterDiscount + taxAmount + fees;
  
      resultBox.innerHTML = `
        <p><strong>Original Price:</strong> $${original.toFixed(2)}</p>
        <p><strong>Discount (${discount}%):</strong> -$${discountAmount.toFixed(2)}</p>
        <p><strong>Tax (${tax}%):</strong> +$${taxAmount.toFixed(2)}</p>
        <p><strong>Extra Fees:</strong> +$${fees.toFixed(2)}</p>
        <hr style="margin: 1rem 0;">
        <p><strong>Final Net Price:</strong> $${finalPrice.toFixed(2)}</p>
      `;
  
      scrollToResult();
    });
  
    function scrollToResult() {
      resultCard.classList.add("highlight");
      resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => resultCard.classList.remove("highlight"), 2000);
    }
  });
  
document.addEventListener("DOMContentLoaded", () => {
    const lmpInput = document.getElementById("lmp");
    const conceptionInput = document.getElementById("conception");
    const calculateBtn = document.getElementById("calculateBtn");
    const resultBox = document.getElementById("resultBox");
    const resultCard = document.getElementById("resultCard");
  
    calculateBtn.addEventListener("click", () => {
      const lmp = lmpInput.value ? new Date(lmpInput.value) : null;
      const conception = conceptionInput.value ? new Date(conceptionInput.value) : null;
  
      if (!lmp && !conception) {
        resultBox.innerHTML = "<p>Please enter either your LMP or conception date.</p>";
        return;
      }
  
      let dueDate;
  
      if (lmp) {
        dueDate = new Date(lmp);
        dueDate.setDate(dueDate.getDate() + 280); // 40 weeks
      } else if (conception) {
        dueDate = new Date(conception);
        dueDate.setDate(dueDate.getDate() + 266); // 38 weeks from conception
      }
  
      const options = { year: "numeric", month: "long", day: "numeric" };
  
      resultBox.innerHTML = `
        <p><strong>Estimated Due Date:</strong><br>${dueDate.toLocaleDateString(undefined, options)}</p>
        <p style="margin-top: 1rem; font-size: 0.9rem; color: #555;">
          ⚠️ This is an estimate. Please consult a healthcare provider for confirmation.
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
  
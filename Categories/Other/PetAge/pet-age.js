document.addEventListener("DOMContentLoaded", function () {
    const calculateBtn = document.getElementById("calculateBtn");
    const resultBox = document.getElementById("resultBox");
  
    calculateBtn.addEventListener("click", () => {
      const type = document.getElementById("petType").value;
      const age = parseFloat(document.getElementById("petAge").value);
  
      if (isNaN(age) || age < 0) {
        resultBox.innerHTML = `<h2>Oops!</h2><p>Please enter a valid age.</p>`;
        return;
      }
  
      let humanAge;
  
      if (type === "dog") {
        humanAge = age * 7;
      } else if (type === "cat") {
        if (age <= 0) {
          humanAge = 0;
        } else if (age <= 1) {
          humanAge = 15;
        } else if (age <= 2) {
          humanAge = 24;
        } else {
          humanAge = 24 + (age - 2) * 4;
        }
      }
  
      resultBox.innerHTML = `
        <h2>Human Age Equivalent 🧍</h2>
        <p>A <strong>${age}-year-old ${type}</strong> is about <strong>${humanAge.toFixed(1)} human years old</strong>.</p>
      `;
  
      setTimeout(() => {
        resultBox.scrollIntoView({ behavior: "smooth" });
      }, 2000);
    });
  });
  
document.addEventListener("DOMContentLoaded", () => {
    const calculateBtn = document.getElementById("calculateBtn");
    const resultCard = document.getElementById("resultCard");
  
    calculateBtn.addEventListener("click", () => {
      // Example logic
      const value = 123; // Replace with real calculation logic
  
      resultCard.innerHTML = `
        <h2>Your Result</h2>
        <p>Result is: <strong>${value}</strong></p>
      `;
  
      setTimeout(() => {
        resultCard.scrollIntoView({ behavior: "smooth" });
      }, 2000); // 2-second delay as per your standard
    });
  });
  
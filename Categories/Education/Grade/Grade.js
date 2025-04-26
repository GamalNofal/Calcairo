document.getElementById("calculateGrade").addEventListener("click", () => {
    const score = parseFloat(document.getElementById("score").value);
    const total = parseFloat(document.getElementById("total").value);
    const resultBox = document.getElementById("gradeResult");
  
    if (isNaN(score) || isNaN(total) || total <= 0) {
      resultBox.innerHTML = `<h2>Oops!</h2><p>Please enter valid numbers for both fields.</p>`;
      return;
    }
  
    const percentage = (score / total) * 100;
    const letter = getLetterGrade(percentage);
  
    resultBox.innerHTML = `
      <h2>Your Grade Result 📊</h2>
      <p><strong>Percentage:</strong> ${percentage.toFixed(2)}%</p>
      <p><strong>Letter Grade:</strong> ${letter}</p>
    `;
  
    setTimeout(() => {
      resultBox.scrollIntoView({ behavior: "smooth" });
    }, 2000);
  });
  
  function getLetterGrade(pct) {
    if (pct >= 90) return "A";
    if (pct >= 80) return "B";
    if (pct >= 70) return "C";
    if (pct >= 60) return "D";
    return "F";
  }
  
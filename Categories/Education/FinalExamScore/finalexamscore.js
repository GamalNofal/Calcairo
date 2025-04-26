// final-exam-score.js

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("finalExamForm");
    const resultCard = document.getElementById("resultCard");
    const resultBox = document.getElementById("examResult");
    const tryAgainBtn = document.getElementById("tryAgain");
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const currentGrade = parseFloat(document.getElementById("currentGrade").value);
      const desiredGrade = parseFloat(document.getElementById("desiredGrade").value);
      const examWeightPercent = parseFloat(document.getElementById("examWeight").value);
  
      if (isNaN(currentGrade) || isNaN(desiredGrade) || isNaN(examWeightPercent) ||
          currentGrade < 0 || desiredGrade < 0 || examWeightPercent <= 0 || examWeightPercent > 100) {
        resultBox.innerHTML = "<p>❌ Please enter valid numbers! (Exam weight must be between 1-100%)</p>";
        resultCard.style.display = "block";
        return;
      }
  
      const examWeight = examWeightPercent / 100;
      const requiredExamScore = (desiredGrade - (currentGrade * (1 - examWeight))) / examWeight;
  
      let message = "";
  
      if (requiredExamScore > 100) {
        message = `😬 You would need <strong>${requiredExamScore.toFixed(2)}%</strong> on the final. That's above 100%! Keep trying your best! 💪`;
      } else if (requiredExamScore < 0) {
        message = `🎉 You already secured your desired grade! No pressure!`;
      } else {
        message = `🎯 You need to score at least <strong>${requiredExamScore.toFixed(2)}%</strong> on your final exam to reach your goal.`;
      }
  
      resultBox.innerHTML = `<p>${message}</p>`;
  
      resultCard.style.display = "block";
      highlightResult();
    });
  
    tryAgainBtn.addEventListener("click", () => {
      form.reset();
      resultCard.style.display = "none";
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  
    function highlightResult() {
      resultCard.classList.add("glow");
      resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => {
        resultCard.classList.remove("glow");
      }, 2000);
    }
  });
  
// study-planner.js

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("studyForm");
    const resultCard = document.getElementById("resultCard");
    const resultBox = document.getElementById("studyPlanResult");
    const tryAgainBtn = document.getElementById("tryAgain");
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const subjects = parseInt(document.getElementById("subjects").value);
      const dailyHours = parseFloat(document.getElementById("dailyHours").value);
      const examDate = document.getElementById("examDate").value;
  
      if (isNaN(subjects) || isNaN(dailyHours) || !examDate || subjects <= 0 || dailyHours <= 0) {
        resultBox.innerHTML = "<p>❌ Please enter valid positive numbers and select a date!</p>";
        resultCard.style.display = "block";
        return;
      }
  
      const today = new Date();
      const exam = new Date(examDate);
      const timeDiff = exam.getTime() - today.getTime();
      const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
      if (daysLeft <= 0) {
        resultBox.innerHTML = "<p>❌ Exam date must be in the future!</p>";
        resultCard.style.display = "block";
        return;
      }
  
      const totalStudyHours = dailyHours * daysLeft;
      const hoursPerSubject = totalStudyHours / subjects;
  
      let tip = "";
      if (daysLeft < 7) {
        tip = "⚡ Your time is tight! Focus on key topics first.";
      } else if (hoursPerSubject < 10) {
        tip = "📚 Make a tight but steady plan.";
      } else {
        tip = "✅ Great pacing! You have enough time to review deeply.";
      }
  
      resultBox.innerHTML = `
        <p><strong>Days Left Until Exam:</strong> ${daysLeft} days</p>
        <p><strong>Total Study Hours Available:</strong> ${Math.round(totalStudyHours)} hours</p>
        <p><strong>Recommended Focus:</strong></p>
        <p style="font-size:1.5rem; margin:8px 0;">~${hoursPerSubject.toFixed(1)} hours per subject total</p>
        <hr style="margin: 1.5rem 0;">
        <p><em>${tip}</em></p>
      `;
  
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
  
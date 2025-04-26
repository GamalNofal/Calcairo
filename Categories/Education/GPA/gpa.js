document.addEventListener("DOMContentLoaded", function () {
    const courseList = document.getElementById("courseList");
    const addBtn = document.getElementById("addCourseBtn");
    const calculateBtn = document.getElementById("calculateGpaBtn");
    const gpaOutput = document.getElementById("gpaOutput");
  
    function createCourseRow() {
      const row = document.createElement("div");
      row.className = "course-row";
      row.innerHTML = `
        <input type="text" placeholder="Course Name">
        <input type="number" placeholder="Grade" min="0" step="0.01">
        <input type="number" placeholder="Credits" min="0" step="0.1">
        <button class="remove-btn">✖</button>
      `;
      row.querySelector(".remove-btn").addEventListener("click", () => row.remove());
      courseList.appendChild(row);
    }
  
    addBtn.addEventListener("click", createCourseRow);
  
    calculateBtn.addEventListener("click", () => {
      const rows = document.querySelectorAll(".course-row");
      const scale = parseFloat(document.getElementById("scale").value);
      let totalPoints = 0;
      let totalCredits = 0;
  
      rows.forEach(row => {
        const grade = parseFloat(row.children[1].value);
        const credits = parseFloat(row.children[2].value);
  
        if (!isNaN(grade) && !isNaN(credits)) {
          totalPoints += grade * credits;
          totalCredits += credits;
        }
      });
  
      const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "—";
      gpaOutput.textContent = gpa;
      setTimeout(() => {
        document.getElementById("resultCard").scrollIntoView({ behavior: "smooth" });
      }, 2000);
    });
  
    createCourseRow(); // Add initial row
  });
  
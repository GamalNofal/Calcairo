function calculateBMR() {
  const gender = document.getElementById("gender").value;
  const age = parseInt(document.getElementById("age").value);
  const weight = parseFloat(document.getElementById("weight").value);
  const height = parseFloat(document.getElementById("height").value);
  const resultCard = document.getElementById("resultCard");
  const result = document.getElementById("bmrResult");
  const activity = document.getElementById("activityCalories");

  if (isNaN(age) || isNaN(weight) || isNaN(height)) {
    result.innerText = "Please fill in all fields correctly.";
    activity.innerHTML = "";
    return;
  }

  let bmr;
  if (gender === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  const rounded = Math.round(bmr);
  result.innerHTML = `<strong>BMR = ${rounded}</strong> Calories/day`;

  const levels = [
    { label: "Sedentary: little or no exercise", factor: 1.2 },
    { label: "Exercise 1-3 times/week", factor: 1.375 },
    { label: "Exercise 4-5 times/week", factor: 1.55 },
    { label: "Daily exercise or intense 3-4 times/week", factor: 1.625 },
    { label: "Intense exercise 6-7 times/week", factor: 1.725 },
    { label: "Very intense exercise daily or physical job", factor: 1.9 }
  ];

  let table = `<table><tr><th>Activity Level</th><th>Calories</th></tr>`;
  levels.forEach(level => {
    const calories = Math.round(rounded * level.factor);
    table += `<tr><td>${level.label}</td><td>${calories}</td></tr>`;
  });
  table += `</table>`;
  activity.innerHTML = table;

  resultCard.classList.add("highlight");
  resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
  setTimeout(() => resultCard.classList.remove("highlight"), 2000);
}

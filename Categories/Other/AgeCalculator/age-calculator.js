function calculateAgeDetails() {
    const input = document.getElementById("dob").value;
    const resultBox = document.getElementById("resultBox");
    const resultCard = document.getElementById("resultCard");
  
    if (!input) {
      resultBox.innerHTML = `<p>Please enter your birth date.</p>`;
      return;
    }
  
    const birthDate = new Date(input);
    const today = new Date();
  
    // Age in years/months/days
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();
  
    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }
  
    // Days until next birthday
    const nextBday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (nextBday < today) nextBday.setFullYear(today.getFullYear() + 1);
    const diffTime = nextBday - today;
    const daysToNextBirthday = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
    // Day of the week born
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const weekdayBorn = weekdays[birthDate.getDay()];
  
    // Zodiac sign
    const zodiac = getZodiac(birthDate.getMonth() + 1, birthDate.getDate());
  
    // Age in weeks and hours
    const ageInDays = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24));
    const ageInWeeks = Math.floor(ageInDays / 7);
    const ageInHours = ageInDays * 24;
  
    resultBox.innerHTML = `
      <p>🎂 You are <strong>${years}</strong> years, <strong>${months}</strong> months, and <strong>${days}</strong> days old.</p>
      <p>📆 Next birthday is in <strong>${daysToNextBirthday}</strong> day(s).</p>
      <p>🗓️ You were born on a <strong>${weekdayBorn}</strong>.</p>
      <p>♈ Your zodiac sign is <strong>${zodiac}</strong>.</p>
      <p>📅 You've lived approximately <strong>${ageInWeeks}</strong> weeks or <strong>${ageInHours.toLocaleString()}</strong> hours.</p>
    `;
  
    // Scroll with delay
    resultCard.classList.add("highlight");
    setTimeout(() => {
      resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => resultCard.classList.remove("highlight"), 2000);
    }, 2000);
  }
  
  // Zodiac sign function
  function getZodiac(month, day) {
    const zodiacSigns = [
      ["Capricorn", 20], ["Aquarius", 19], ["Pisces", 20], ["Aries", 20], ["Taurus", 21], ["Gemini", 21],
      ["Cancer", 23], ["Leo", 23], ["Virgo", 23], ["Libra", 23], ["Scorpio", 22], ["Sagittarius", 22], ["Capricorn", 31]
    ];
    return day < zodiacSigns[month - 1][1] ? zodiacSigns[month - 1][0] : zodiacSigns[month][0];
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("calculateBtn").addEventListener("click", calculateAgeDetails);
  });
  
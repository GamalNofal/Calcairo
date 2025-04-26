document.addEventListener("DOMContentLoaded", () => {
  const dateInput = document.getElementById("dateInput");
  const resultBox = document.getElementById("resultBox");
  const resultCard = document.getElementById("resultCard");
  const calculateBtn = document.getElementById("calculateBtn");

  calculateBtn.addEventListener("click", () => {
    const dateVal = dateInput.value;
    if (!dateVal) {
      resultBox.innerHTML = "<p>Please select a date.</p>";
      return;
    }

    const date = new Date(dateVal);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to midnight

    const weekday = date.toLocaleDateString(undefined, { weekday: "long" });

    if (date > today) {
      resultBox.innerHTML = `
        <p><strong>${date.toDateString()}</strong> will be a <strong>${weekday}</strong>.</p>
        <p>${getFutureNote()}</p>
      `;
    } else {
      const zodiac = getZodiac(date);
      const moon = getMoonPhase(date);
      const events = getHistoricFacts(date);

      resultBox.innerHTML = `
        <p><strong>${date.toDateString()}</strong> was a <strong>${weekday}</strong>.</p>
        <p>Zodiac Sign: <strong>${zodiac}</strong></p>
        <p>Moon Phase: <strong>${moon}</strong></p>
        <p>Notable:</p>
        <ul>
          ${events.map((e) => `<li>${e}</li>`).join("")}
        </ul>
      `;
    }

    scrollToResult();
  });

  function getZodiac(date) {
    const d = date.getDate();
    const m = date.getMonth() + 1;
    if ((m === 1 && d >= 20) || (m === 2 && d <= 18)) return "Aquarius ♒️";
    if ((m === 2 && d >= 19) || (m === 3 && d <= 20)) return "Pisces ♓️";
    if ((m === 3 && d >= 21) || (m === 4 && d <= 19)) return "Aries ♈️";
    if ((m === 4 && d >= 20) || (m === 5 && d <= 20)) return "Taurus ♉️";
    if ((m === 5 && d >= 21) || (m === 6 && d <= 20)) return "Gemini ♊️";
    if ((m === 6 && d >= 21) || (m === 7 && d <= 22)) return "Cancer ♋️";
    if ((m === 7 && d >= 23) || (m === 8 && d <= 22)) return "Leo ♌️";
    if ((m === 8 && d >= 23) || (m === 9 && d <= 22)) return "Virgo ♍️";
    if ((m === 9 && d >= 23) || (m === 10 && d <= 22)) return "Libra ♎️";
    if ((m === 10 && d >= 23) || (m === 11 && d <= 21)) return "Scorpio ♏️";
    if ((m === 11 && d >= 22) || (m === 12 && d <= 21)) return "Sagittarius ♐️";
    return "Capricorn ♑️";
  }

  function getMoonPhase(date) {
    const moonNames = ["New Moon", "Waxing Crescent", "First Quarter", "Waxing Gibbous",
                       "Full Moon", "Waning Gibbous", "Last Quarter", "Waning Crescent"];
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const c = Math.floor((year - 1900) * 12.3685);
    const n = c + month + (day / 30);
    const phaseIndex = Math.floor((n % 1) * 8);
    return moonNames[phaseIndex];
  }

  function getHistoricFacts(date) {
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const key = `${m}-${d}`;

    const facts = {
      "3-14": ["Einstein was born (1879)", "Pi Day 📐"],
      "7-20": ["Apollo 11 Moon Landing (1969)", "Fortune Cookie Day 🍪"],
      "12-25": ["Christmas Day 🎄", "Isaac Newton born (1642)"],
      "10-31": ["Halloween 🎃", "Vanilla Ice born (1967)"]
    };

    return facts[key] || [getWisdomNote()];
  }

  function getWisdomNote() {
    const notes = [
      "Every day is a chance to start fresh. 🌱",
      "Time moves forward — make it count. ⏳",
      "Your story is written one day at a time. 📖",
      "Great things can happen on ordinary days. 🌟",
      "A date is just a moment — how you live it matters most. ❤️",
      "Some days aren't in history books, but they're big in your heart. 🧠",
      "Even quiet days plant seeds for tomorrow. 🌾",
      "Sometimes, nothing happening is a gift. 🎁",
      "Ordinary dates carry extraordinary memories. 💭",
      "History is made daily — yours too. 🕰️",
      "Be present. Even today has something to teach you. 👣",
      "You made it through this day — that's enough. ✅",
      "Small joys add up. Keep collecting them. 🍃",
      "Nothing special? You’re the special one today. 🎉",
      "You don’t need history to matter. You matter already. 🧡",
      "Stillness can be the beginning of greatness. 🧘",
      "Quiet days are loud with meaning. 🫶",
      "The universe doesn’t skip days — neither should you. ✨",
      "This date could be someone’s best day ever. 🌈",
      "Look at you — learning, growing, showing up. 🌱",
      "Today is what you make it. 🛠️",
      "A blank day is space to write your own story. ✍️",
      "Your presence makes today historic. 🫂",
      "The world kept turning — and so did you. 🔄",
      "You’re not late. You’re arriving right on time. ⏰",
      "Joy doesn't always shout — sometimes it whispers. 🕊️",
      "This date doesn’t need a headline to matter. 📰",
      "You brought life to this day. 💡",
      "You are a living moment of history. 🧬",
      "Reflection is power. This date gives you both. 🪞",
      "Today counts — even if no one recorded it. 🧾",
      "Let today be a pause. Pauses have power. ⏸️",
      "Remember, breathing is a kind of progress too. 🌬️",
      "The sun rose for you today. ☀️",
      "Sometimes quiet is the loudest form of beauty. 🎨",
      "You are the event this day needed. 💫",
      "This day is a canvas. What will you paint? 🖌️",
      "Even the calendar takes breaks. 🗓️",
      "This is a bridge — not a destination. 🌉",
      "A single smile can make this day shine. 😄",
      "Today’s moment is tomorrow’s memory. 🎞️",
      "Nothing happened? Rest is sacred too. 😴",
      "History can wait. Your peace can't. 🧘‍♀️",
      "Every date has meaning when you're present. 🫧",
      "Not every day needs to shout. Whisper days matter too. 🤫",
      "You’ve survived every day so far — including this one. 💪",
      "The stars still showed up. So did you. 🌌",
      "Your energy makes this date important. ⚡",
      "No news is sometimes the best news. 🗞️",
      "Today is for you. That’s enough. 🎈"
    ];
    return notes[Math.floor(Math.random() * notes.length)];
  }

  function getFutureNote() {
    const notes = [
      "The future is unwritten. Make it beautiful. 🌅",
      "Great things are coming your way. ✨",
      "You control the future — one step at a time. 🚶‍♀️",
      "Mark this date. It may become a milestone. 📍",
      "A blank page in your story — write it well. 📖",
      "Don’t just wait for the day — prepare for it. 🛠️",
      "This future day holds more than you expect. 🔮",
      "Hope is already waiting for you there. 🌈",
      "Your presence will make that day matter. 🧡",
      "The best stories are yet to come. 🎬"
    ];
    return notes[Math.floor(Math.random() * notes.length)];
  }

  function scrollToResult() {
    resultCard.classList.add("highlight");
    resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => resultCard.classList.remove("highlight"), 2000);
  }
});

const emojimap = {
  // Emotions
  "happy": "😊", "sad": "😢", "angry": "😠", "love": "❤️", "excited": "🤩", "tired": "😴",
  "surprised": "😲", "confused": "😕", "laugh": "😂", "cry": "😭", "bored": "🥱", "cool": "😎",
  "kiss": "😘", "shy": "☺️", "worried": "😟", "fear": "😨", "joy": "😁", "smile": "🙂",
  "blush": "😊", "meh": "😐", "angryface": "😡", "grin": "😬",

  // Animals
  "dog": "🐶", "cat": "🐱", "rabbit": "🐰", "bear": "🐻", "lion": "🦁", "tiger": "🐯",
  "cow": "🐮", "monkey": "🐵", "fox": "🦊", "koala": "🐨", "pig": "🐷", "panda": "🐼",
  "mouse": "🐭", "chicken": "🐔", "duck": "🦆", "penguin": "🐧", "frog": "🐸",

  // Food
  "pizza": "🍕", "burger": "🍔", "fries": "🍟", "hotdog": "🌭", "apple": "🍎",
  "banana": "🍌", "grape": "🍇", "cherry": "🍒", "cake": "🎂", "icecream": "🍨",
  "cookie": "🍪", "bread": "🍞", "cheese": "🧀", "egg": "🥚", "rice": "🍚",
  "sushi": "🍣", "bacon": "🥓", "carrot": "🥕", "corn": "🌽",

  // Objects
  "car": "🚗", "bike": "🚲", "bus": "🚌", "train": "🚆", "plane": "✈️", "boat": "⛵",
  "book": "📖", "phone": "📱", "laptop": "💻", "clock": "⏰", "camera": "📷", "tv": "📺",
  "bulb": "💡", "gift": "🎁", "money": "💰", "credit": "💳", "tool": "🛠️",

  // Weather
  "sun": "☀️", "cloud": "☁️", "rain": "🌧️", "snow": "❄️", "storm": "🌩️", "wind": "🌬️",
  "rainbow": "🌈", "umbrella": "☂️", "hot": "🥵", "cold": "🥶",

  // Activities
  "run": "🏃", "walk": "🚶", "dance": "💃", "swim": "🏊", "bike": "🚴", "read": "📚",
  "write": "✍️", "paint": "🎨", "music": "🎵", "sing": "🎤", "sleep": "😴",
  "eat": "🍽️", "cook": "👨‍🍳", "travel": "🌍", "shop": "🛍️", "exercise": "🏋️",

  // More fun icons
  "fire": "🔥", "star": "⭐", "heart": "💖", "brain": "🧠", "robot": "🤖",
  "alien": "👽", "ghost": "👻", "zombie": "🧟", "poop": "💩", "rocket": "🚀",
  "earth": "🌎", "moon": "🌕", "tree": "🌳", "flower": "🌸", "ball": "⚽",
};

function convertToEmoji() {
  const input = document.getElementById("textInput").value.trim();
  const result = document.getElementById("emojiOutput");
  const words = input.toLowerCase().split(/\s+/);

  const converted = words.map(word => emojiMap[word] || word).join(" ");
  result.innerText = converted;

  scrollToResult();
}

function scrollToResult() {
  const resultCard = document.getElementById("resultCard");
  resultCard.classList.add("highlight");
  resultCard.scrollIntoView({ behavior: "smooth", block: "center" });

  setTimeout(() => resultCard.classList.remove("highlight"), 2000);
}


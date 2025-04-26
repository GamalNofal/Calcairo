// Dynamically displays a random set of featured calculators on the homepage
const calculators = [
  // Fun & Playful (all links verified to exist)
  {
    href: 'Categories/fitness/BMI/bmi.html',
    icon: '⚖️',
    title: 'BMI Calculator',
    desc: 'Check your Body Mass Index'
  },
  {
    href: 'Categories/fitness/Calorie/Calorie.html',
    icon: '🔥',
    title: 'Calorie Calculator',
    desc: 'Track your daily calories'
  },
  {
    href: 'Categories/fitness/Water/water.html',
    icon: '💧',
    title: 'Water Intake',
    desc: 'How much water do you need?'
  },
  {
    href: 'Categories/fun/friendshipstrength/friendshipstrength.html',
    icon: '👥',
    title: 'Friendship Strength',
    desc: 'Calculate your friendship strength'
  },
  {
    href: 'Categories/fun/love/love.html',
    icon: '❤️',
    title: 'Love Score',
    desc: 'Playful love percentage calculator'
  },
  {
    href: 'Categories/fun/whatspell/what-spell.html',
    icon: '🧙',
    title: 'What Spell Are You?',
    desc: 'Discover your magical spell'
  },
  {
    href: 'Categories/fun/elementaldestiny/elemental-destiny.html',
    icon: '🪄',
    title: 'Elemental Destiny',
    desc: 'Playful elemental clash calculator'
  },
  {
    href: 'Categories/fun/planetweight/planet-weight.html',
    icon: '🪐',
    title: 'Planet Weight',
    desc: 'Calculate your weight on other planets'
  },
  {
    href: 'Categories/fun/superpower/superpower.html',
    icon: '🦸',
    title: 'Superpower Calculator',
    desc: 'Discover your hidden superpower'
  },
  {
    href: 'Categories/funnyfoodulator/BurgerBuilder/burger-builder.html',
    icon: '🍔',
    title: 'Burger Builder',
    desc: 'Build your perfect burger'
  },
  {
    href: 'Categories/funnyfoodulator/cake-slice-age/cake-slice-age.html',
    icon: '🍰',
    title: 'Cake Slice Age',
    desc: 'Calculate your cake slice age'
  },
  {
    href: 'Categories/funnyfoodulator/pizza-to-steps/pizza-to-steps.html',
    icon: '🍕',
    title: 'Pizza to Steps',
    desc: 'Calculate how many steps you need to burn off a slice of pizza'
  },
  {
    href: 'Categories/funnyfoodulator/soda-spirit/soda-spirit.html',
    icon: '🥤',
    title: 'Soda Spirit',
    desc: 'Discover your soda spirit'
  },
  {
    href: 'Categories/funnyfoodulator/how-many-eggs/how-many-eggs.html',
    icon: '🥚',
    title: 'How Many Eggs',
    desc: 'Calculate how many eggs you can eat in a lifetime'
  },
  {
    href: 'Categories/funnyfoodulator/friedchicken/fried-chicken.html',
    icon: '🍗',
    title: 'Fried Chicken',
    desc: 'Calculate your fried chicken'
  },
  {
    href: 'Categories/funnyfoodulator/wrapbattlepersonality/wrap-battle.html',
    icon: '🌯',
    title: 'Wrap Battle Personality',
    desc: 'Calculate your wrap personality'
  },
  {
    href: 'Categories/funnyfoodulator/cheesecompatibility/cheese-compatibility.html',
    icon: '🧀',
    title: 'Cheese Compatibility',
    desc: 'Calculate your cheese compatibility'
  },
  {
    href: 'Categories/funnyfoodulator/meltdownpredictor/meltdown-predictor.html',
    icon: '🍩💥',
    title: 'Meltdown Predictor',
    desc: 'Calculate your meltdown'
  },
  {
    href: 'Categories/other/agecalculator/age-calculator.html',
    icon: '📅',
    title: 'Age Calculator',
    desc: 'Calculate your age'
  },
  {
    href: 'Categories/other/PetAge/pet-age.html',
    icon: '⚖️',
    title: 'Pet Age',
    desc: 'Calculate your pet age'
  },
  {
    href: 'Categories/other/agecalculator/age-calculator.html',
    icon: '📅',
    title: 'Age Calculator',
    desc: 'Calculate your age'
  },
  {
    href: 'Categories/other/periodcalculator/period-calculator.html ',
    icon: '📅',
    title: 'Period Calculator',
    desc: 'Calculate your period'
  }
];

function getRandomIndexes(arr, n) {
  const result = [];
  const used = new Set();
  while (result.length < n && used.size < arr.length) {
    const idx = Math.floor(Math.random() * arr.length);
    if (!used.has(idx)) {
      result.push(idx);
      used.add(idx);
    }
  }
  return result;
}

function renderFeaturedCalculatorsRandom() {
  const grid = document.querySelector('.calc-grid');
  if (!grid) return;
  grid.innerHTML = '';
  const indexes = getRandomIndexes(calculators, 4);
  indexes.forEach((i, idx) => {
    const calc = calculators[i];
    const a = document.createElement('a');
    a.href = calc.href;
    a.className = 'calc-card calc-card-animate';
    a.style.animationDelay = (idx * 0.1) + 's';
    a.innerHTML = `
      <span style="font-size:2rem;">${calc.icon}</span>
      <div style="font-weight:600;margin:0.5rem 0 0.2rem;">${calc.title}</div>
      <div style="font-size:0.95rem;color:#555;">${calc.desc}</div>
    `;
    grid.appendChild(a);
    setTimeout(() => a.classList.remove('calc-card-animate'), 700);
  });
}

renderFeaturedCalculatorsRandom();
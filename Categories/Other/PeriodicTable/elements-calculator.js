document.addEventListener("DOMContentLoaded", () => {
    const elementInput = document.getElementById("elementInput");
    const resultBox = document.getElementById("resultBox");
    const resultCard = document.getElementById("resultCard");
    const calculateBtn = document.getElementById("calculateBtn");
  
    const elements = {
      H: { name: "Hydrogen", number: 1, weight: 1.008, state: "Gas", group: "1", period: "1", usage: "Fuel, stars, rocket fuel" },
      He: { name: "Helium", number: 2, weight: 4.0026, state: "Gas", group: "18", period: "1", usage: "Balloons, cooling, lasers" },
      Li: { name: "Lithium", number: 3, weight: 6.94, state: "Solid", group: "1", period: "2", usage: "Batteries, medicine" },
      C: { name: "Carbon", number: 6, weight: 12.011, state: "Solid", group: "14", period: "2", usage: "Life, diamonds, graphite" },
      O: { name: "Oxygen", number: 8, weight: 15.999, state: "Gas", group: "16", period: "2", usage: "Breathing, combustion" },
      Na: { name: "Sodium", number: 11, weight: 22.99, state: "Solid", group: "1", period: "3", usage: "Salt, soap" },
      Al: { name: "Aluminum", number: 13, weight: 26.98, state: "Solid", group: "13", period: "3", usage: "Cans, foil, aerospace" },
      Si: { name: "Silicon", number: 14, weight: 28.085, state: "Solid", group: "14", period: "3", usage: "Chips, glass, solar cells" },
      Fe: { name: "Iron", number: 26, weight: 55.845, state: "Solid", group: "8", period: "4", usage: "Steel, tools, blood (hemoglobin)" },
      Cu: { name: "Copper", number: 29, weight: 63.546, state: "Solid", group: "11", period: "4", usage: "Wires, coins, pipes" },
      Ag: { name: "Silver", number: 47, weight: 107.87, state: "Solid", group: "11", period: "5", usage: "Jewelry, photography" },
      Au: { name: "Gold", number: 79, weight: 196.97, state: "Solid", group: "11", period: "6", usage: "Jewelry, electronics, currency" },
      Pb: { name: "Lead", number: 82, weight: 207.2, state: "Solid", group: "14", period: "6", usage: "Batteries, shielding" },
      U: { name: "Uranium", number: 92, weight: 238.03, state: "Solid", group: "Actinides", period: "7", usage: "Nuclear fuel" }
    };
  
    // Create lookup table (allow name and symbol access)
    const elementData = {};
    Object.entries(elements).forEach(([symbol, data]) => {
      elementData[symbol.toLowerCase()] = { symbol, ...data };
      elementData[data.name.toLowerCase()] = { symbol, ...data };
    });
  
    calculateBtn.addEventListener("click", () => {
      const input = elementInput.value.trim().toLowerCase();
      const element = elementData[input];
  
      if (!element) {
        resultBox.innerHTML = `<p>❌ Element not found. Try a valid name or symbol like "Au" or "Oxygen".</p>`;
        return;
      }
  
      const comparison = compareWeight(element.weight);
  
      resultBox.innerHTML = `
        <p><strong>Symbol:</strong> ${element.symbol}</p>
        <p><strong>Name:</strong> ${element.name}</p>
        <p><strong>Atomic Number:</strong> ${element.number}</p>
        <p><strong>Atomic Weight:</strong> ${element.weight}</p>
        <p><strong>Group:</strong> ${element.group}</p>
        <p><strong>Period:</strong> ${element.period}</p>
        <p><strong>State at Room Temp:</strong> ${element.state}</p>
        <p><strong>Usage:</strong> ${element.usage}</p>
        <p><strong>Fun Comparison:</strong> ${comparison}</p>
      `;
  
      scrollToResult();
    });
  
    function compareWeight(weight) {
      const gold = elements["Au"].weight;
      const uranium = elements["U"].weight;
  
      if (weight > uranium) return "Heavier than uranium! That’s rare!";
      if (weight > gold) return "Heavier than gold! That’s impressive!";
      if (weight === gold) return "Same weight as gold. 💰 Bling bling!";
      if (weight < gold && weight > 1) return "Lighter than gold, but still valuable!";
      if (weight <= 1.5) return "Lighter than air — literally! 🌬️";
      return "That’s a light element — almost nothing!";
    }
  
    function scrollToResult() {
      resultCard.classList.add("highlight");
      resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => resultCard.classList.remove("highlight"), 2000);
    }
  });
  
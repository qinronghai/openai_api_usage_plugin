const costs = [];

for (let i = 0; i < 8; i++) {
  const items = [
    { name: "Base", cost: Math.floor(Math.random() * 100) },
    { name: "FT Training", cost: Math.floor(Math.random() * 100) },
    { name: "FT Inference", cost: Math.floor(Math.random() * 100) },
    { name: "Embeddings", cost: Math.floor(Math.random() * 100) },
    { name: "DALL-E API", cost: Math.floor(Math.random() * 100) },
  ];

  costs.push({ items });
}

console.log(costs);

const lastSevenDaysItems = costs.slice(-7).map((day) => day.items);
console.log(lastSevenDaysItems, "近七日的总数据");

const totalCostForLastSevenDays = lastSevenDaysItems.reduce((accumulator, currentValue) => {
  const dailyCost = currentValue.reduce((sum, item) => sum + item.cost, 0);
  return accumulator + dailyCost;
}, 0);
console.log(totalCostForLastSevenDays);

const dailyCostsForSevenDays = lastSevenDaysItems.map((day) => day.reduce((sum, item) => sum + item.cost, 0));
console.log(dailyCostsForSevenDays);

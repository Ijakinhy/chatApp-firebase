export const awaIt = () =>
  new Promise((res) => setTimeout(res, Math.random() * 3000));

const generateRandomColor = () => {
  const existingBudget = fetchData("budgets")?.length ?? 0;
  return `${existingBudget * 34} 65% 50%`;
};

export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const deleteItem = ({ key }) => {
  return localStorage.removeItem(key);
};
export const createBudget = ({ name, amount }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    amount: Number(amount),
    createAt: Date.now(),
    color: generateRandomColor(),
  };

  const existingBudget = fetchData("budgets") ?? [];
  const newBudgets = [...existingBudget, newItem];
  localStorage.setItem("budgets", JSON.stringify(newBudgets));
};

export const createExpense = ({ name, amount, budgetId }) => {
  const newExpense = {
    id: crypto.randomUUID(),
    name: name,
    amount: Number(amount),
    createAt: Date.now(),
    budgetId: budgetId,
  };

  const existingBudget = fetchData("expenses") ?? [];
  const newExpenses = [...existingBudget, newExpense];
  localStorage.setItem("expenses", JSON.stringify(newExpenses));
};

export const formatCurrency = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
  });
};

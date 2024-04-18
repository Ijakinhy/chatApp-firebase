export const awaIt = () =>
  new Promise((res) => setTimeout(res, Math.random() * 800));

const generateRandomColor = () => {
  const existingBudget = fetchData("budgets")?.length ?? 0;
  return `${existingBudget * 34} 65% 50%`;
};

export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};
//delete expense
export const deleteItem = ({ key, id }) => {
  const existingExpenses = fetchData(key) ?? [];
  if (id) {
    const newExpenses = existingExpenses.filter((expense) => expense.id !== id);
    return localStorage.setItem(key, JSON.stringify(newExpenses));
  }
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

// formatting
export const formatPercentage = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
};
export const formatDateToLocaleString = (epoch) => {
  return new Date(epoch).toLocaleDateString();
};
export const formatCurrency = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
  });
};

export const calculateSpentBudget = (budgetId) => {
  const expenses = fetchData("expenses") ?? [];

  const budgetSpent = expenses.reduce((acc, expense) => {
    if (expense.budgetId === budgetId) {
      return (acc += expense.amount);
    }
    return acc;
  }, 0);

  return budgetSpent;
};

// filter
export const getAllMatchingItems = ({ category, key, value }) => {
  const budgets = fetchData(category) ?? [];
  return budgets.filter((budget) => budget[key] === value);
};

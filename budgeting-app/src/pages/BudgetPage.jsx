import React from "react";
import { getAllMatchingItems } from "../helpers";

export const budgetLoader = async ({ params }) => {
  const budget = await getAllMatchingItems({
    key: "budgets",
    id: params.id,
  })[0];
  const expense = await getAllMatchingItems({
    key: "expenses",
    id: params.id,
  })[0];
  return { budget, expense };
};
const BudgetPage = () => {
  return <div>BudgetPage</div>;
};

export default BudgetPage;

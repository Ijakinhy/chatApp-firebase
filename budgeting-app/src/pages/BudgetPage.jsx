import React from "react";
import {
  awaIt,
  createExpense,
  deleteItem,
  getAllMatchingItems,
} from "../helpers";
import { useLoaderData } from "react-router-dom";
import BudgetItem from "../component/BudgetItem";
import AddExpenseForm from "../component/AddExpenseForm ";
import Table from "../component/Table";
import { toast } from "react-toastify";

export const budgetLoader = async ({ params }) => {
  const budget = await getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: params.id,
  })[0];
  const expenses = await getAllMatchingItems({
    category: "expenses",
    key: "budgetId",
    value: params.id,
  });
  if (!budget) {
    throw new Error("The budget you’re trying to find doesn’t exist");
  }

  return { budget, expenses };
};
export const budgetAction = async ({ request }) => {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
  if (_action === "deleteExpense") {
    try {
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });
      await awaIt();

      return toast.success(`Expense deleted`);
    } catch (error) {
      throw new Error("There was a problem with deleting expense");
    }
  }
  if (_action === "createExpense") {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });
      await awaIt();
      return toast.success(`expense ${values.newExpense} Created`);
    } catch (error) {
      throw new Error("There was a problem with creating budget");
    }
  }
};

const BudgetPage = () => {
  const { budget, expenses } = useLoaderData();
  return (
    <div className="grid-lg" style={{ "--accent": budget.color }}>
      <h1 className="h2">
        Budget <span className="accent">{budget?.name}</span> Overview
      </h1>
      <div className="flex-lg">
        <BudgetItem budget={budget} showDelete={true} />
        <AddExpenseForm budgets={[budget]} />
      </div>
      {expenses && expenses.length > 0 && (
        <div className="grid-md">
          <h2>
            <span className="accent">{budget.name}</span> Expenses
          </h2>
          <Table expenses={expenses} showBudget={false} />
        </div>
      )}
    </div>
  );
};

export default BudgetPage;

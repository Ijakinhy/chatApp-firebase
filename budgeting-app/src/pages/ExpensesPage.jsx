import React from "react";
import { awaIt, deleteItem, fetchData } from "../helpers";
import { useLoaderData } from "react-router-dom";
import Table from "../component/Table";
import { toast } from "react-toastify";

export const ExpensesLoader = () => {
  const expenses = fetchData("expenses");
  return { expenses };
};
export const expenseAction = async ({ request }) => {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "deleteExpense") {
    try {
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });
      await awaIt();

      return toast.success("Expense deleted");
    } catch (error) {
      console.log(error.message);
      throw new Error("There was a problem with deleting expense");
    }
  }
};

const ExpensesPage = () => {
  const { expenses } = useLoaderData();
  return (
    <div className="grid-lg">
      <h1>All Expenses</h1>
      {expenses && expenses.length > 0 ? (
        <>
          <h2>
            Recent Expenses <small>({expenses.length} total)</small>{" "}
          </h2>
          <div className="grid-md">
            <Table expenses={expenses} />
          </div>
        </>
      ) : (
        <h2>No Expense to show</h2>
      )}
    </div>
  );
};

export default ExpensesPage;

import { toast } from "react-toastify";
import { awaIt, createBudget, createExpense, deleteItem } from "../helpers";

export const dashboardAction = async ({ request }) => {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "newUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName));
      return toast.success(`Welcome, ${values.userName}`);
    } catch (error) {
      throw new Error("there was a problem  with creating account");
    }
  }

  if (_action === "createBudget") {
    try {
      createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
      });
      await awaIt();

      return toast.success("Budget Created");
    } catch (error) {
      throw new Error("There was a problem with creating budget");
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
  // delete  expense

  if (_action === "deleteExpense") {
    try {
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });
      await awaIt();

      return toast.success("Expense deleted");
    } catch (error) {
      throw new Error("There was a problem with deleting expense");
    }
  }
};

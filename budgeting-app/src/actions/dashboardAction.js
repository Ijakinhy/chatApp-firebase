import { toast } from "react-toastify";
import { awaIt, createBudget } from "../helpers";

export const dashboardAction = async ({ request }) => {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "newUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName));
      await awaIt();
      return toast.success(`Welcome, ${values.userName}`);
    } catch (error) {
      throw new Error("there was a problem  with creating account ");
    }
  }

  if (_action === "createBudget") {
    try {
      createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
      });
      return toast.success("Budget Created");
    } catch (error) {
      throw new Error("There was a problem with creating budget");
    }
  }
};

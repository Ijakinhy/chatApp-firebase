import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import dashboardLoader from "./loaders/dashboardLoader";
import Error from "./pages/Error";
import Main from "./layout/Main";
import mainLoader from "./loaders/mainLoader";
import { Children } from "react";
import { ToastContainer } from "react-toastify";
import { logoutAction } from "./actions/logout";
import { dashboardAction } from "./actions/dashboardAction";
import ExpensesPage, {
  ExpensesLoader,
  expenseAction,
} from "./pages/ExpensesPage";
import BudgetPage, { budgetLoader } from "./pages/BudgetPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <DashBoard />,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <Error />,
      },
      {
        path: "expense",
        element: <ExpensesPage />,
        loader: ExpensesLoader,
        action: expenseAction,
      },
      {
        path: "budget/:id",
        element: <BudgetPage />,
        loader: budgetLoader,
        errorElement: <Error />,
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;

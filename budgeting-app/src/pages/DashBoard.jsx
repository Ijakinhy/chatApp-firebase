import React from "react";
import { useLoaderData } from "react-router-dom";
import Intro from "../component/Intro";
import AddBudgetForm from "../component//AddBudgetForm";
import AddExpenseForm from "../component/AddExpenseForm ";
import BudgetItem from "../component/BudgetItem";

const DashBoard = () => {
  const { userName, budgets } = useLoaderData();

  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>
            Welcome Back <span className="accent">{userName}</span>
          </h1>
          <div className="grid-sm">
            {budgets && budgets.length > 0 ? (
              <div className="grid-lg">
                <div className="flex-lg">
                  <AddBudgetForm />
                  <AddExpenseForm budgets={budgets} />
                </div>
                <h2>Existing Budgets</h2>
                <div className="budgets">
                  {budgets.map((budget) => (
                    <BudgetItem key={budget.id} budget={budget} />
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div className="grid-sm">
                  <p>Personal budgeting is the secret to financial freedom.</p>
                  <p>Create a budget to get started!</p>
                  <AddBudgetForm />
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
};

export default DashBoard;

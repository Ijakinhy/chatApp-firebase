import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import Intro from "../component/Intro";
import AddBudgetForm from "../component//AddBudgetForm";
import AddExpenseForm from "../component/AddExpenseForm ";
import BudgetItem from "../component/BudgetItem";
import Table from "../component/Table";

const DashBoard = () => {
  const { userName, budgets, expenses } = useLoaderData();

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
            {expenses && expenses.length > 0 && (
              <div className="grid-md">
                <h2>Recent Expenses</h2>
                <Table
                  expenses={expenses
                    .sort((a, b) => b.createAt - a.createAt)
                    .slice(0, 8)}
                />
                {expenses.length > 8 && (
                  <Link to="expense" className="btn btn--dark">
                    View All Expenses
                  </Link>
                )}
              </div>
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

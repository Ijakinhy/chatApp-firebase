import React from "react";
import { useLoaderData } from "react-router-dom";
import Intro from "../component/Intro";
import AddBudgetForm from "../component//AddBudgetForm";

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
            {/* {budgets?():()} */}
            <div className="grid-lg">
              <div className="flex-lg">
                <AddBudgetForm />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
};

export default DashBoard;
